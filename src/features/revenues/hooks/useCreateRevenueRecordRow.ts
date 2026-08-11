import { useFormContext, useWatch } from 'react-hook-form';
import { DriverResponse } from '@/api/generated/model';
import { useRevenueFormCalculations } from './useRevenueFormCalculations';

interface UseCreateRevenueRecordRowProps {
  index: number;
  drivers: DriverResponse[];
}

export const useCreateRevenueRecordRow = ({ index, drivers }: UseCreateRevenueRecordRowProps) => {
  const { control, setValue, resetField } = useFormContext();
  const fieldPrefix = `dailyRevenueRecords.${index}.`;

  const driverId = useWatch({
    name: `${fieldPrefix}driverId`,
    control,
  });

  const selectedDriverRemunerationConfig = useWatch({
    name: `${fieldPrefix}driverRemunerationType`,
    control,
  });

  const tripCount = useWatch({
    name: `${fieldPrefix}tripCount`,
    control,
  });

  const pricePerTrip = useWatch({
    name: `${fieldPrefix}pricePerTrip`,
    control,
  });

  const kilometersFrom = useWatch({
    name: `${fieldPrefix}kilometersFrom`,
    control,
  });

  const kilometersTo = useWatch({
    name: `${fieldPrefix}kilometersTo`,
    control,
  });

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
    fieldPrefix,
  });

  return {
    driverRemunerationConfigOptions,
    weekdayName,
    isWeeklyPaymentToday,
    isWeeklyFixedRate,
    driverId,
    selectedDriverRemunerationConfig,
    weeklyConfig,
  };
};
