import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  getGetMyShiftsInfiniteQueryKey,
  getGetMyShiftsQueryKey,
  useCreateMyShift,
} from '@/api/generated/endpoints/shifts/shifts';
import { CreateShiftRevenueEntryRequest } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import { DriverShiftFlatRateOption } from '../../components/driver/DriverShiftRevenuesCard';
import {
  DriverCreateShiftFormValues,
  getDriverCreateShiftSchema,
} from '../../domain/driver-shift-schemas';

export const useDriverCreateShiftForm = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['app', 'common', 'errors']);
  const navigate = useNavigate();

  const methods = useForm<DriverCreateShiftFormValues>({
    resolver: zodResolver(getDriverCreateShiftSchema(t)) as any,
    mode: 'onChange',
    defaultValues: {
      carId: undefined as unknown as number,
      shiftStart: '',
      shiftEnd: '',
      odometerStart: undefined as unknown as number,
      odometerEnd: undefined as unknown as number,
      singleRides: [],
      flatRateCounts: {},
      flatRatePrices: {},
      weeklyRentPaid: undefined as unknown as number,
    },
  });

  const { mutate, isPending } = useCreateMyShift({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:shifts.notifications.create.success', 'Schicht erfolgreich erstellt'));
        queryClient.invalidateQueries({ queryKey: getGetMyShiftsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetMyShiftsInfiniteQueryKey() });
        navigate(ROUTES.app.driver.shifts.path);
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
    const regularSum = values.singleRides.reduce((acc, val) => acc + val, 0);
    const revenues: CreateShiftRevenueEntryRequest[] = [];

    // 1. Cash single rides
    if (regularSum > 0) {
      revenues.push({
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
      const price =
        flatType?.defaultPrice !== undefined && flatType?.defaultPrice !== null
          ? flatType.defaultPrice
          : (values.flatRatePrices && values.flatRatePrices[key]) ?? 0;

      if (count && count > 0 && price > 0) {
        revenues.push({
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: flatType?.id,
          tripCount: count,
          pricePerTrip: price,
        });
      }
    });

    // 3. Weekly rent paid (if entered)
    if (values.weeklyRentPaid && Number(values.weeklyRentPaid) > 0) {
      revenues.push({
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
    cancel: () => navigate(ROUTES.app.driver.shifts.path),
  };
};
