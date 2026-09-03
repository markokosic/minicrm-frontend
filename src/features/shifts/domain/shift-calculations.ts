import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  CreateShiftRequest,
  CreateShiftRevenueEntryRequest,
  ShiftResponse,
  ShiftRevenueEntryResponse,
  ShiftSettlementResponse,
  UpdateShiftRequest,
  UpdateShiftRevenueEntryRequest,
} from '@/api/generated/model';
import { ShiftRevenueFormRow } from './shifts-schemas';

dayjs.extend(isoWeek);

export interface ShiftDurationResult {
  hours: number;
  minutes: number;
  decimalHours: number;
  text: string;
}

export interface ShiftTotalsResult {
  totalRevenue: number;
  totalDriverRemuneration: number;
  totalCompanyRemuneration: number;
}

export interface WeeklySettlementResult {
  isWeeklyPaymentToday: boolean;
  weekdayName: string;
}

/**
 * Builds a consistent option key for driver revenue options and form rows.
 */
export const getRevenueOptionKey = (
  entryCategory?: string | null,
  flatRateTypeId?: number | null
): string => {
  if (entryCategory === 'FLAT_RATE') {
    return `FLAT_RATE_${flatRateTypeId ?? 'none'}`;
  }
  return entryCategory || 'REGULAR';
};

/**
 * Calculates driven kilometers from start and end odometer values.
 */
export const calculateKilometersDriven = (
  odometerStart?: number | null,
  odometerEnd?: number | null
): number | null => {
  if (
    typeof odometerStart === 'number' &&
    typeof odometerEnd === 'number' &&
    odometerEnd >= odometerStart
  ) {
    return odometerEnd - odometerStart;
  }
  return null;
};

/**
 * Calculates shift duration in hours and minutes between start and end date strings.
 */
export const calculateShiftDuration = (
  shiftStart?: string | null,
  shiftEnd?: string | null
): ShiftDurationResult | null => {
  if (!shiftStart || !shiftEnd) {return null;}
  const start = dayjs(shiftStart);
  const end = dayjs(shiftEnd);
  if (!start.isValid() || !end.isValid() || !end.isAfter(start)) {return null;}

  const diffMinutes = end.diff(start, 'minute');
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const decimalHours = Math.round((diffMinutes / 60) * 100) / 100;

  return {
    hours,
    minutes,
    decimalHours,
    text: `${hours} Std. ${minutes > 0 ? `${minutes} Min.` : ''} (${decimalHours} h)`,
  };
};

/**
 * Checks if target shift date (or today) matches the weekly settlement day.
 */
export const checkWeeklySettlement = (
  targetDate?: string | null,
  settlementDay: number = 7
): WeeklySettlementResult => {
  const date = targetDate && dayjs(targetDate).isValid() ? dayjs(targetDate) : dayjs();
  const currentIsoWeekday = date.isoWeekday();
  const isWeeklyPaymentToday = currentIsoWeekday === settlementDay;
  const weekdayName = date.isoWeekday(settlementDay).format('dddd');

  return { isWeeklyPaymentToday, weekdayName };
};

/**
 * Calculates total for flat rate trips: N * pricePerTrip.
 */
export const calculateFlatRateTotal = (
  tripCount?: number | null,
  pricePerTrip?: number | null
): number => {
  return (Number(tripCount) || 0) * (Number(pricePerTrip) || 0);
};

/**
 * Computes aggregated revenue, driver remuneration, and company share for a shift.
 * Uses the backend settlement snapshot if available, otherwise aggregates entries.
 */
export const calculateShiftTotals = (
  revenuesOrShift?: ShiftRevenueEntryResponse[] | ShiftResponse | null,
  settlementOverride?: ShiftSettlementResponse | null
): ShiftTotalsResult => {
  if (!revenuesOrShift) {
    return {
      totalRevenue: 0,
      totalDriverRemuneration: 0,
      totalCompanyRemuneration: 0,
    };
  }

  // If a full ShiftResponse object is passed
  if (
    typeof revenuesOrShift === 'object' &&
    !Array.isArray(revenuesOrShift) &&
    ('settlement' in revenuesOrShift || 'revenues' in revenuesOrShift)
  ) {
    const shift = revenuesOrShift as ShiftResponse;
    if (shift.settlement) {
      return {
        totalRevenue: shift.settlement.totalRevenue ?? 0,
        totalDriverRemuneration: shift.settlement.driverRemuneration ?? 0,
        totalCompanyRemuneration: shift.settlement.companyRemuneration ?? 0,
      };
    }
    return calculateShiftTotals(shift.revenues);
  }

  if (settlementOverride) {
    return {
      totalRevenue: settlementOverride.totalRevenue ?? 0,
      totalDriverRemuneration: settlementOverride.driverRemuneration ?? 0,
      totalCompanyRemuneration: settlementOverride.companyRemuneration ?? 0,
    };
  }

  const revenues = revenuesOrShift as ShiftRevenueEntryResponse[];
  if (!Array.isArray(revenues) || revenues.length === 0) {
    return {
      totalRevenue: 0,
      totalDriverRemuneration: 0,
      totalCompanyRemuneration: 0,
    };
  }

  return revenues.reduce(
    (acc, r) => ({
      totalRevenue: acc.totalRevenue + (r.revenue || 0),
      totalDriverRemuneration: acc.totalDriverRemuneration + (r.driverRemuneration || 0),
      totalCompanyRemuneration: acc.totalCompanyRemuneration + (r.companyRemuneration || 0),
    }),
    { totalRevenue: 0, totalDriverRemuneration: 0, totalCompanyRemuneration: 0 }
  );
};

/**
 * Formats date string to DD.MM.YYYY.
 */
export const formatShiftDate = (dateString?: string | null, locale = 'de-DE'): string => {
  if (!dateString) {return '-';}
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? '-'
    : date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
};

/**
 * Formats time portion of date string to HH:mm.
 */
export const formatShiftTime = (dateString?: string | null, locale = 'de-DE'): string => {
  if (!dateString) {return '-';}
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? '-'
    : date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
};

/**
 * Transforms form values into CreateShiftRequest payload for API submission.
 */
export const transformShiftFormPayload = (values: any): CreateShiftRequest => {
  const formattedRevenues: CreateShiftRevenueEntryRequest[] = values.revenues.map(
    (r: ShiftRevenueFormRow) => {
      if (r.entryCategory === 'WEEKLY') {
        const rent = Number(r.weeklyDriverRent ?? r.revenue ?? 0);
        return {
          entryCategory: 'WEEKLY',
          weeklyDriverRent: rent,
          revenue: rent,
        };
      }
      if (r.entryCategory === 'FLAT_RATE') {
        const entry: CreateShiftRevenueEntryRequest = {
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: r.flatRateTypeId ? Number(r.flatRateTypeId) : undefined,
        };
        if (
          r.tripCount !== undefined &&
          r.tripCount !== null &&
          r.pricePerTrip !== undefined &&
          r.pricePerTrip !== null
        ) {
          entry.tripCount = Number(r.tripCount);
          entry.pricePerTrip = Number(r.pricePerTrip);
        } else {
          entry.revenue = Number(r.revenue || 0);
        }
        return entry;
      }
      return {
        entryCategory: r.entryCategory,
        revenue: Number(r.revenue || 0),
      };
    }
  );

  return {
    driverId: Number(values.driverId),
    carId: Number(values.carId),
    odometerStart: Number(values.odometerStart),
    odometerEnd: Number(values.odometerEnd),
    shiftStart: dayjs(values.shiftStart).toISOString(),
    shiftEnd: dayjs(values.shiftEnd).toISOString(),
    status: values.status || 'APPROVED',
    revenues: formattedRevenues,
  };
};

/**
 * Transforms form values into UpdateShiftRequest payload for PUT /api/shifts/{id}.
 */
export const transformUpdateShiftPayload = (values: any): UpdateShiftRequest => {
  const formattedRevenues: UpdateShiftRevenueEntryRequest[] = values.revenues.map(
    (r: ShiftRevenueFormRow) => {
      if (r.id) {
        if (r.entryCategory === 'WEEKLY') {
          const rent = Number(r.weeklyDriverRent ?? r.revenue ?? 0);
          return {
            id: r.id,
            weeklyDriverRent: rent,
            revenue: rent,
          };
        }
        if (
          r.entryCategory === 'FLAT_RATE' &&
          r.tripCount !== undefined &&
          r.tripCount !== null &&
          r.pricePerTrip !== undefined &&
          r.pricePerTrip !== null
        ) {
          return {
            id: r.id,
            tripCount: Number(r.tripCount),
            pricePerTrip: Number(r.pricePerTrip),
          };
        }
        return {
          id: r.id,
          revenue: Number(r.revenue || 0),
        };
      }

      if (r.entryCategory === 'WEEKLY') {
        const rent = Number(r.weeklyDriverRent ?? r.revenue ?? 0);
        return {
          id: null as any,
          entryCategory: 'WEEKLY',
          weeklyDriverRent: rent,
          revenue: rent,
        };
      }

      if (r.entryCategory === 'FLAT_RATE') {
        const entry: UpdateShiftRevenueEntryRequest = {
          id: null as any,
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: r.flatRateTypeId ? Number(r.flatRateTypeId) : undefined,
        };
        if (
          r.tripCount !== undefined &&
          r.tripCount !== null &&
          r.pricePerTrip !== undefined &&
          r.pricePerTrip !== null
        ) {
          entry.tripCount = Number(r.tripCount);
          entry.pricePerTrip = Number(r.pricePerTrip);
        } else {
          entry.revenue = Number(r.revenue || 0);
        }
        return entry;
      }

      return {
        id: null as any,
        entryCategory: r.entryCategory,
        revenue: Number(r.revenue || 0),
      };
    }
  );

  return {
    carId: values.carId ? Number(values.carId) : undefined,
    odometerStart: Number(values.odometerStart),
    odometerEnd: Number(values.odometerEnd),
    shiftStart: dayjs(values.shiftStart).toISOString(),
    shiftEnd: dayjs(values.shiftEnd).toISOString(),
    revenues: formattedRevenues,
  };
};
