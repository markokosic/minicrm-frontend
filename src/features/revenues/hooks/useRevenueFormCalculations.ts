import { useEffect } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { FieldValues, UseFormResetField, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DriverResponse } from '@/api/generated/model';
import {
  FlatRateRemunerationConfig,
  RemunerationModelType,
  WeeklyFixedRemunerationConfig,
  i18nDriverRemunerationConfigMap,
} from '@/features/remuneration';

dayjs.extend(isoWeek);

export interface UseRevenueFormCalculationsProps {
  drivers?: DriverResponse[];
  driverId?: number | null;
  selectedDriverRemunerationConfig?: RemunerationModelType | null;
  tripCount?: number | null;
  pricePerTrip?: number | null;
  kilometersFrom?: number | null;
  kilometersTo?: number | null;
  setValue: UseFormSetValue<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  fieldPrefix?: string;
}

export const useRevenueFormCalculations = ({
  drivers,
  driverId,
  selectedDriverRemunerationConfig,
  tripCount,
  pricePerTrip,
  kilometersFrom,
  kilometersTo,
  setValue,
  resetField,
  fieldPrefix = '',
}: UseRevenueFormCalculationsProps) => {
  const { t } = useTranslation(['app', 'common']);

  const getFieldName = (name: string) => `${fieldPrefix}${name}`;

  const driver = drivers?.find((d) => d.id === driverId);

  const driverRemunerationConfigOptions =
    driver?.currentRemunerationConfigs?.map((config) => ({
      label: `${t(`app:remuneration.type.${i18nDriverRemunerationConfigMap[config.remunerationModelType as RemunerationModelType]}`)}`,
      value: config.remunerationModelType,
    })) ?? [];

  const selectedConfig = driver?.currentRemunerationConfigs?.find(
    (c) => c.remunerationModelType === selectedDriverRemunerationConfig
  );

  const isWeeklyFixedRate =
    selectedDriverRemunerationConfig === RemunerationModelType.WEEKLY_FIXED_RATE;
  const weeklyConfig = isWeeklyFixedRate
    ? (selectedConfig as WeeklyFixedRemunerationConfig)
    : null;

  const isWeeklyPaymentToday =
    Boolean(weeklyConfig) && weeklyConfig?.settlementDay === dayjs().isoWeekday();

  const weekdayName = weeklyConfig
    ? dayjs().isoWeekday(weeklyConfig.settlementDay).format('dddd')
    : null;

  // 1. Sync revenue for flat rate
  useEffect(() => {
    if (
      selectedDriverRemunerationConfig === RemunerationModelType.FLAT_RATE &&
      tripCount &&
      pricePerTrip
    ) {
      setValue(getFieldName('revenue'), tripCount * pricePerTrip, {
        shouldValidate: true,
      });
    }
  }, [selectedDriverRemunerationConfig, tripCount, pricePerTrip, fieldPrefix, setValue]);

  // 2. Pre-fill pricePerTrip for Flat Rate from config if not already set
  useEffect(() => {
    if (
      selectedDriverRemunerationConfig === RemunerationModelType.FLAT_RATE &&
      selectedConfig &&
      'flatRateFee' in selectedConfig
    ) {
      const flatRateConfig = selectedConfig as FlatRateRemunerationConfig;
      if (pricePerTrip === undefined || pricePerTrip === null) {
        setValue(getFieldName('pricePerTrip'), flatRateConfig.flatRateFee, {
          shouldValidate: true,
        });
      }
    }
  }, [selectedDriverRemunerationConfig, selectedConfig, pricePerTrip, fieldPrefix, setValue]);

  // 3. Set default remuneration type if driver has only one config
  useEffect(() => {
    if (driver?.currentRemunerationConfigs?.length === 1) {
      setValue(
        getFieldName('driverRemunerationType'),
        driver.currentRemunerationConfigs[0].remunerationModelType,
        { shouldValidate: true }
      );
    }
  }, [driver, fieldPrefix, setValue]);

  // 4. Calculate kilometers driven
  useEffect(() => {
    if (
      kilometersFrom !== undefined &&
      kilometersTo !== undefined &&
      kilometersFrom !== null &&
      kilometersTo !== null
    ) {
      const diff = kilometersTo - kilometersFrom;
      if (diff >= 0) {
        setValue(getFieldName('kilometersDriven'), diff, { shouldValidate: true });
      }
    }
  }, [kilometersFrom, kilometersTo, fieldPrefix, setValue]);

  // 5. Set weekly fixed rate settlement
  useEffect(() => {
    if (isWeeklyFixedRate && isWeeklyPaymentToday && weeklyConfig) {
      setValue(
        getFieldName('companyRemuneration'),
        weeklyConfig.weeklyFixedCompanySettlement,
        { shouldValidate: true }
      );
    } else {
      resetField(getFieldName('companyRemuneration'));
    }
  }, [isWeeklyFixedRate, isWeeklyPaymentToday, weeklyConfig, fieldPrefix, resetField, setValue]);

  return {
    driver,
    driverRemunerationConfigOptions,
    selectedConfig,
    isWeeklyFixedRate,
    weeklyConfig,
    isWeeklyPaymentToday,
    weekdayName,
  };
};
