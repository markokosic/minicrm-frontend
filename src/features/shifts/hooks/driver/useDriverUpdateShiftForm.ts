import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  getGetMyShiftByIdQueryKey,
  getGetMyShiftsInfiniteQueryKey,
  getGetMyShiftsQueryKey,
  useUpdateMyShift,
} from '@/api/generated/endpoints/shifts/shifts';
import { ShiftResponse, UpdateShiftRevenueEntryRequest } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import { DriverShiftFlatRateOption } from '../../components/driver/DriverShiftRevenuesCard';
import {
  DriverCreateShiftFormValues,
  getDriverCreateShiftSchema,
} from '../../domain/driver-shift-schemas';

interface UseDriverUpdateShiftFormProps {
  shift: ShiftResponse;
}

export const useDriverUpdateShiftForm = ({ shift }: UseDriverUpdateShiftFormProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['app', 'common', 'errors']);
  const navigate = useNavigate();

  // Extract initial single rides
  const regularRevenues = shift.revenues?.filter((r) => r.entryCategory === 'REGULAR') || [];
  const initialSingleRides = regularRevenues.map((r) => r.revenue ?? 0).filter((v) => v > 0);

  // Extract initial flat rate counts & prices
  const initialFlatRateCounts: Record<string, number> = {};
  const initialFlatRatePrices: Record<string, number> = {};
  shift.revenues
    ?.filter((r) => r.entryCategory === 'FLAT_RATE')
    .forEach((r, idx) => {
      const key = r.flatRateTypeId ? String(r.flatRateTypeId) : `custom_${idx}`;
      if (r.tripCount) {
        initialFlatRateCounts[key] = r.tripCount;
      }
      if (r.pricePerTrip) {
        initialFlatRatePrices[key] = r.pricePerTrip;
      }
    });

  // Extract weekly company share paid
  const weeklyRevenue = shift.revenues?.find((r) => r.entryCategory === 'WEEKLY');
  const initialWeeklyRentPaid = weeklyRevenue?.revenue ?? undefined;

  const methods = useForm<DriverCreateShiftFormValues>({
    resolver: zodResolver(getDriverCreateShiftSchema(t)) as any,
    mode: 'onChange',
    defaultValues: {
      carId: shift.car?.id as unknown as number,
      shiftStart: shift.shiftStart ?? '',
      shiftEnd: shift.shiftEnd ?? '',
      odometerStart: shift.odometerStart ?? (undefined as unknown as number),
      odometerEnd: shift.odometerEnd ?? (undefined as unknown as number),
      singleRides: initialSingleRides,
      flatRateCounts: initialFlatRateCounts,
      flatRatePrices: initialFlatRatePrices,
      weeklyRentPaid: initialWeeklyRentPaid,
    },
  });

  const { mutate, isPending } = useUpdateMyShift({
    mutation: {
      onSuccess: () => {
        toast.success(
          t('app:shifts.notifications.update.success', 'Schicht erfolgreich aktualisiert')
        );
        if (shift.id) {
          queryClient.invalidateQueries({ queryKey: getGetMyShiftByIdQueryKey(shift.id) });
        }
        queryClient.invalidateQueries({ queryKey: getGetMyShiftsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetMyShiftsInfiniteQueryKey() });
        if (shift.id) {
          navigate(ROUTES.app.driver.shifts.view.getHref(shift.id));
        } else {
          navigate(ROUTES.app.driver.shifts.path);
        }
      },
      onError: (error: unknown) => {
        const apiErrorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('errors:common.unknown', 'Ein Fehler ist aufgetreten');
        toast.error(apiErrorMessage);
      },
    },
  });

  const handleSubmitWithFlatRates = (
    values: DriverCreateShiftFormValues,
    flatRateTypes: DriverShiftFlatRateOption[]
  ) => {
    if (!shift.id) return;

    const regularSum = values.singleRides.reduce((acc, val) => acc + val, 0);
    const revenues: UpdateShiftRevenueEntryRequest[] = [];

    // 1. Cash single rides
    if (regularSum > 0) {
      const existingRegular = shift.revenues?.find((r) => r.entryCategory === 'REGULAR');
      revenues.push({
        id: existingRegular?.id,
        entryCategory: 'REGULAR',
        revenue: Math.round(regularSum * 100) / 100,
      });
    }

    // 2. Flat rate entries with tripCount > 0
    Object.entries(values.flatRateCounts || {}).forEach(([key, count]) => {
      const typeId = isNaN(Number(key)) ? undefined : Number(key);
      const flatType = flatRateTypes.find(
        (f, idx) =>
          (f.id !== undefined && f.id === typeId) || (f.id === undefined && `custom_${idx}` === key)
      );
      const existingFlat = shift.revenues?.find(
        (r) =>
          r.entryCategory === 'FLAT_RATE' &&
          ((typeId !== undefined && r.flatRateTypeId === typeId) || (!typeId && !r.flatRateTypeId))
      );
      const price =
        flatType?.defaultPrice !== undefined && flatType?.defaultPrice !== null
          ? flatType.defaultPrice
          : (values.flatRatePrices && values.flatRatePrices[key]) ?? 0;

      if (count && count > 0 && price > 0) {
        revenues.push({
          id: existingFlat?.id,
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: flatType?.id,
          tripCount: count,
          pricePerTrip: price,
        });
      }
    });

    // 3. Weekly rent paid (if entered)
    if (values.weeklyRentPaid && Number(values.weeklyRentPaid) > 0) {
      const existingWeekly = shift.revenues?.find((r) => r.entryCategory === 'WEEKLY');
      revenues.push({
        id: existingWeekly?.id,
        entryCategory: 'WEEKLY',
        revenue: Number(values.weeklyRentPaid),
      });
    }

    if (revenues.length === 0) {
      toast.error(
        t(
          'app:shifts.errors.at_least_one_revenue',
          'Bitte mindestens eine Cash Fahrt, Pauschale oder Firmenanteil erfassen'
        )
      );
      return;
    }

    mutate({
      id: shift.id,
      data: {
        carId: Number(values.carId),
        odometerStart: Number(values.odometerStart),
        odometerEnd: Number(values.odometerEnd),
        shiftStart: dayjs(values.shiftStart).toISOString(),
        shiftEnd: dayjs(values.shiftEnd).toISOString(),
        revenues,
      },
    });
  };

  return {
    methods,
    onSubmit: handleSubmitWithFlatRates,
    isPending,
    cancel: () =>
      shift.id
        ? navigate(ROUTES.app.driver.shifts.view.getHref(shift.id))
        : navigate(ROUTES.app.driver.shifts.path),
  };
};
