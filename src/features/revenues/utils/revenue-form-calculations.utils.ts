import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { DriverResponse } from '@/api/generated/model';
import {
  RemunerationModelType,
  WeeklyFixedRemunerationConfig,
  i18nDriverRemunerationConfigMap,
} from '@/features/remuneration';

dayjs.extend(isoWeek);

export type TranslateFn = (key: string) => string;

export interface RemunerationConfigOption {
  label: string;
  value: RemunerationModelType;
}

export const findDriverById = (
  drivers: DriverResponse[] | undefined,
  driverId: number | null | undefined
): DriverResponse | undefined => {
  if (!drivers || driverId === null || driverId === undefined) {
    return undefined;
  }
  return drivers.find((d) => d.id === driverId);
};

export const getDriverRemunerationConfigOptions = (
  driver: DriverResponse | undefined,
  t: TranslateFn
): RemunerationConfigOption[] => {
  if (!driver?.currentRemunerationConfigs) {
    return [];
  }
  return driver.currentRemunerationConfigs.map((config) => {
    const modelType = config.remunerationModelType as RemunerationModelType;
    const translationKey = i18nDriverRemunerationConfigMap[modelType];
    return {
      label: t(`app:remuneration.type.${translationKey}`),
      value: modelType,
    };
  });
};

export const findSelectedRemunerationConfig = (
  driver: DriverResponse | undefined,
  selectedType: RemunerationModelType | null | undefined
) => {
  if (!driver?.currentRemunerationConfigs || !selectedType) {
    return undefined;
  }
  return driver.currentRemunerationConfigs.find(
    (c) => c.remunerationModelType === selectedType
  );
};

export const checkWeeklySettlement = (
  weeklyConfig: WeeklyFixedRemunerationConfig | null,
  currentIsoWeekday: number = dayjs().isoWeekday()
): { isWeeklyPaymentToday: boolean; weekdayName: string | null } => {
  if (!weeklyConfig) {
    return { isWeeklyPaymentToday: false, weekdayName: null };
  }
  const isWeeklyPaymentToday = weeklyConfig.settlementDay === currentIsoWeekday;
  const weekdayName = dayjs().isoWeekday(weeklyConfig.settlementDay).format('dddd');
  return { isWeeklyPaymentToday, weekdayName };
};

export const calculateFlatRateRevenue = (
  tripCount: number | null | undefined,
  pricePerTrip: number | null | undefined
): number | null => {
  if (tripCount && pricePerTrip) {
    return tripCount * pricePerTrip;
  }
  return null;
};

export const calculateKilometersDriven = (
  kilometersFrom: number | null | undefined,
  kilometersTo: number | null | undefined
): number | null => {
  if (
    kilometersFrom !== undefined &&
    kilometersTo !== undefined &&
    kilometersFrom !== null &&
    kilometersTo !== null
  ) {
    const diff = kilometersTo - kilometersFrom;
    return diff >= 0 ? diff : null;
  }
  return null;
};
