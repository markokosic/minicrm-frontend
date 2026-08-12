import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FieldValues, useForm, UseFormResetField, UseFormSetValue, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { getGetAllDailyRevenuesQueryKey, useUpdateDailyRevenue } from '@/api/generated/endpoints/revenues/revenues';
import {
  CarResponse as Car,
  CreateDailyRevenueRequest,
  DailyRevenueResponse,
  DriverResponse as Driver,
} from '@/api/generated/model';
import { CreateRevenueRecordRequest, getCreateRevenueRecordSchema } from '../revenues-schemas';
import { getRevenueEditFormDefaultValues } from '../utils/revenue-edit-form.utils';
import { mapCarsToRevenueOptions, mapDriversToRevenueOptions } from '../utils/revenue-options.utils';
import { useRevenueFormCalculations } from './useRevenueFormCalculations';

interface UseRevenueEditFormProps {
  revenue: DailyRevenueResponse;
  drivers: Driver[];
  cars: Car[];
  onSuccess: () => void;
}

export const useRevenueEditForm = ({ revenue, drivers, cars, onSuccess }: UseRevenueEditFormProps) => {
  const { t } = useTranslation(['app', 'common', 'errors']);
  const queryClient = useQueryClient();

  const carOptions = mapCarsToRevenueOptions(cars ?? []);
  const driverOptions = mapDriversToRevenueOptions(drivers ?? []);

  const { mutate, isPending } = useUpdateDailyRevenue({
    mutation: {
      onSuccess: () => {
        toast.success(t('common:actions.confirm'));
        queryClient.invalidateQueries({ queryKey: getGetAllDailyRevenuesQueryKey() });
        onSuccess();
      },
      onError: (err: unknown) => {
        const apiErrorMessage =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
          (err as { message?: string })?.message ||
          t('errors:common.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const methods = useForm<CreateRevenueRecordRequest>({
    resolver: zodResolver(getCreateRevenueRecordSchema(t)),
    shouldUnregister: true,
    mode: 'onChange',
    defaultValues: getRevenueEditFormDefaultValues(revenue),
  });

  const { control, setValue, resetField } = methods;

  const driverId = useWatch({ name: 'driverId', control });
  const selectedDriverRemunerationConfig = useWatch({ name: 'driverRemunerationType', control });
  const tripCount = useWatch({ name: 'tripCount', control });
  const pricePerTrip = useWatch({ name: 'pricePerTrip', control });
  const kilometersFrom = useWatch({ name: 'kilometersFrom', control });
  const kilometersTo = useWatch({ name: 'kilometersTo', control });

  const {
    driverRemunerationConfigOptions,
    weekdayName,
    isWeeklyPaymentToday,
    isWeeklyFixedRate,
    weeklyConfig,
  } = useRevenueFormCalculations({
    drivers,
    driverId,
    selectedDriverRemunerationConfig,
    tripCount,
    pricePerTrip,
    kilometersFrom,
    kilometersTo,
    setValue: setValue as unknown as UseFormSetValue<FieldValues>,
    resetField: resetField as unknown as UseFormResetField<FieldValues>,
  });

  const onSubmit = (data: CreateRevenueRecordRequest) => {
    if (revenue.id) {
      mutate({ id: revenue.id, data: data as CreateDailyRevenueRequest });
    }
  };

  return {
    methods,
    onSubmit,
    isPending,
    carOptions,
    driverOptions,
    driverRemunerationConfigOptions,
    weekdayName,
    isWeeklyPaymentToday,
    isWeeklyFixedRate,
    driverId,
    selectedDriverRemunerationConfig,
    weeklyConfig,
  };
};
