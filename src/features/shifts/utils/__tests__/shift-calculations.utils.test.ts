import {
  calculateFlatRateTotal,
  calculateKilometersDriven,
  calculateShiftDuration,
  calculateShiftTotals,
  formatShiftDate,
  formatShiftTime,
  transformShiftFormPayload,
} from '../shift-calculations.utils';

describe('shift-calculations.utils', () => {
  describe('calculateKilometersDriven', () => {
    it('returns difference when odometerEnd >= odometerStart', () => {
      expect(calculateKilometersDriven(45000, 45312)).toBe(312);
      expect(calculateKilometersDriven(0, 100)).toBe(100);
    });

    it('returns null when invalid or end < start', () => {
      expect(calculateKilometersDriven(45000, 44000)).toBeNull();
      expect(calculateKilometersDriven(null, 45312)).toBeNull();
      expect(calculateKilometersDriven(45000, undefined)).toBeNull();
    });
  });

  describe('calculateShiftDuration', () => {
    it('calculates duration correctly between valid start and end dates', () => {
      const result = calculateShiftDuration('2026-08-13T06:00', '2026-08-13T14:30');
      expect(result).not.toBeNull();
      expect(result?.hours).toBe(8);
      expect(result?.minutes).toBe(30);
      expect(result?.decimalHours).toBe(8.5);
      expect(result?.text).toBe('8 Std. 30 Min. (8.5 h)');
    });

    it('returns null if start/end invalid or end <= start', () => {
      expect(calculateShiftDuration('2026-08-13T14:30', '2026-08-13T06:00')).toBeNull();
      expect(calculateShiftDuration('', '2026-08-13T14:30')).toBeNull();
    });
  });

  describe('calculateFlatRateTotal', () => {
    it('computes tripCount * pricePerTrip', () => {
      expect(calculateFlatRateTotal(2, 150)).toBe(300);
      expect(calculateFlatRateTotal(1, 42.5)).toBe(42.5);
      expect(calculateFlatRateTotal(undefined, 100)).toBe(0);
    });
  });

  describe('calculateShiftTotals', () => {
    it('sums revenues, driverRemuneration, and companyRemuneration', () => {
      const revenues = [
        { revenue: 100, driverRemuneration: 60, companyRemuneration: 40 },
        { revenue: 200, driverRemuneration: 120, companyRemuneration: 80 },
      ];
      expect(calculateShiftTotals(revenues as any)).toEqual({
        totalRevenue: 300,
        totalDriverRemuneration: 180,
        totalCompanyRemuneration: 120,
      });
    });

    it('returns zeros for empty or null array', () => {
      expect(calculateShiftTotals(null)).toEqual({
        totalRevenue: 0,
        totalDriverRemuneration: 0,
        totalCompanyRemuneration: 0,
      });
    });
  });

  describe('formatShiftDate & formatShiftTime', () => {
    it('formats date and time string', () => {
      const iso = '2026-08-13T14:30:00Z';
      expect(formatShiftDate(iso)).not.toBe('-');
      expect(formatShiftTime(iso)).not.toBe('-');
    });

    it('returns dash for invalid or null input', () => {
      expect(formatShiftDate(null)).toBe('-');
      expect(formatShiftTime(undefined)).toBe('-');
    });
  });

  describe('transformShiftFormPayload', () => {
    it('transforms form values into API request payload', () => {
      const values = {
        driverId: '10',
        carId: '5',
        odometerStart: 45000,
        odometerEnd: 45200,
        shiftStart: '2026-08-13T06:00',
        shiftEnd: '2026-08-13T14:00',
        status: 'APPROVED',
        revenues: [
          { entryCategory: 'REGULAR', revenue: 120 },
          { entryCategory: 'FLAT_RATE', flatRateTypeId: 3, tripCount: 2, pricePerTrip: 150 },
        ],
      };

      const payload = transformShiftFormPayload(values);
      expect(payload.driverId).toBe(10);
      expect(payload.carId).toBe(5);
      expect(payload.revenues).toHaveLength(2);
      expect(payload.revenues[1]).toEqual({
        entryCategory: 'FLAT_RATE',
        flatRateTypeId: 3,
        tripCount: 2,
        pricePerTrip: 150,
      });
    });
  });
});
