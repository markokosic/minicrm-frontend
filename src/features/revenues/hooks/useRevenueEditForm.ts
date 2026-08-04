import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { getGetAllDailyRevenuesQueryKey, useUpdateDailyRevenue } from '@/api/generated/endpoints/revenues/revenues';
import {
  CarResponse as Car,
  DriverResponse as Driver,
} from '@/api/generated/model';
import { getCreateRevenueRecordSchema } from '../revenues-schemas';
import { useRevenueFormCalculations } from './useRevenueFormCalculations';

interface UseRevenueEditFormProps {
  revenue: any;
  drivers: Driver[];
  cars: Car[];
  onSuccess: () => void;
}

export const useRevenueEditForm = ({ revenue, drivers, cars, onSuccess }: UseRevenueEditFormProps) => {
  const { t } = useTranslation(['app', 'common', 'errors']);
  const queryClient = useQueryClient();

  const carOptions =
    cars?.map((car) => ({
      label: `${car.licensePlate} ${car.model} ${car.brand}`,
      value: car.id!,
    })) ?? [];

  const driverOptions =
    drivers?.map((driver) => ({
      label: `${driver.firstName} ${driver.lastName}`,
      value: driver.id!,
    })) ?? [];

  const { mutate, isPending } = useUpdateDailyRevenue({
    mutation: {
      onSuccess: () => {
        toast.success(t('common:actions.confirm'));
        queryClient.invalidateQueries({ queryKey: getGetAllDailyRevenuesQueryKey() });
        onSuccess();
      },
      onError: (err: any) => {
        const apiErrorMessage = err?.response?.data?.message || err.message || t('errors:common.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const methods = useForm({
    resolver: zodResolver(getCreateRevenueRecordSchema(t)),
    shouldUnregister: true,
    mode: 'onChange',
    defaultValues: {
      driverId: revenue.driver?.id ?? revenue.driverId ?? undefined,
      carId: revenue.car?.id ?? revenue.carId ?? undefined,
      date: revenue.date ? dayjs(revenue.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      kilometersDriven: revenue.kilometersDriven ?? undefined,
      kilometersFrom: revenue.kilometersFrom ?? undefined,
      kilometersTo: revenue.kilometersTo ?? undefined,
      drivingStartTime: revenue.drivingStartTime ? revenue.drivingStartTime.substring(0, 5) : undefined,
      drivingEndTime: revenue.drivingEndTime ? revenue.drivingEndTime.substring(0, 5) : undefined,
      driverRemunerationType: revenue.remunerationModelType ?? undefined,
      revenue: revenue.revenue ?? undefined,
      tripCount: revenue.tripCount ?? undefined,
      pricePerTrip: revenue.pricePerTrip ?? undefined,
      companyRemuneration: revenue.companyRemuneration ?? undefined,
    },
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
    setValue,
    resetField,
  });

  const onSubmit = (data: any) => {
    mutate({ id: revenue.id, data });
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
