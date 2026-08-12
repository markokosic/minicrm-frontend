import { useEffect, useCallback } from 'react';
import { FieldValues, UseFormResetField, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DriverResponse } from '@/api/generated/model';
import {
  FlatRateRemunerationConfig,
  RemunerationModelType,
  WeeklyFixedRemunerationConfig,
} from '@/features/remuneration';
import {
  calculateFlatRateRevenue,
  calculateKilometersDriven,
  checkWeeklySettlement,
  findDriverById,
  findSelectedRemunerationConfig,
  getDriverRemunerationConfigOptions,
} from '../utils/revenue-form-calculations.utils';

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

  const getFieldName = useCallback((name: string) => `${fieldPrefix}${name}`, [fieldPrefix]);

  const driver = findDriverById(drivers, driverId);

  const driverRemunerationConfigOptions = getDriverRemunerationConfigOptions(driver, t);

  const selectedConfig = findSelectedRemunerationConfig(
    driver,
    selectedDriverRemunerationConfig
  );

  const isWeeklyFixedRate =
    selectedDriverRemunerationConfig === RemunerationModelType.WEEKLY_FIXED_RATE;
  const weeklyConfig = isWeeklyFixedRate
    ? (selectedConfig as WeeklyFixedRemunerationConfig)
    : null;

  const { isWeeklyPaymentToday, weekdayName } = checkWeeklySettlement(weeklyConfig);

  // 1. Sync revenue for flat rate
  useEffect(() => {
    if (selectedDriverRemunerationConfig === RemunerationModelType.FLAT_RATE) {
      const calculatedRevenue = calculateFlatRateRevenue(tripCount, pricePerTrip);
      if (calculatedRevenue !== null) {
        setValue(getFieldName('revenue'), calculatedRevenue, {
          shouldValidate: true,
        });
      }
    }
  }, [selectedDriverRemunerationConfig, tripCount, pricePerTrip, getFieldName, setValue]);

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
  }, [selectedDriverRemunerationConfig, selectedConfig, pricePerTrip, getFieldName, setValue]);

  // 3. Set default remuneration type if driver has only one config
  useEffect(() => {
    if (driver?.currentRemunerationConfigs?.length === 1) {
      setValue(
        getFieldName('driverRemunerationType'),
        driver.currentRemunerationConfigs[0].remunerationModelType,
        { shouldValidate: true }
      );
    }
  }, [driver, getFieldName, setValue]);

  // 4. Calculate kilometers driven
  useEffect(() => {
    const kilometersDriven = calculateKilometersDriven(kilometersFrom, kilometersTo);
    if (kilometersDriven !== null) {
      setValue(getFieldName('kilometersDriven'), kilometersDriven, { shouldValidate: true });
    }
  }, [kilometersFrom, kilometersTo, getFieldName, setValue]);

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
  }, [isWeeklyFixedRate, isWeeklyPaymentToday, weeklyConfig, getFieldName, resetField, setValue]);

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

