import dayjs from 'dayjs';
import { DailyRevenueResponse } from '@/api/generated/model';
import { RemunerationModelType } from '@/features/remuneration';
import { CreateRevenueRecordRequest } from '../revenues-schemas';

export const getRevenueEditFormDefaultValues = (
  revenue: DailyRevenueResponse
): CreateRevenueRecordRequest => ({
  driverId: revenue.driver?.id ?? undefined,
  carId: revenue.car?.id ?? undefined,
  date: revenue.date ? dayjs(revenue.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
  kilometersDriven: revenue.kilometersDriven ?? undefined,
  kilometersFrom: revenue.kilometersFrom ?? undefined,
  kilometersTo: revenue.kilometersTo ?? undefined,
  drivingStartTime: revenue.drivingStartTime ? revenue.drivingStartTime.substring(0, 5) : undefined,
  drivingEndTime: revenue.drivingEndTime ? revenue.drivingEndTime.substring(0, 5) : undefined,
  driverRemunerationType: (revenue.remunerationModelType as RemunerationModelType) ?? undefined,
  revenue: revenue.revenue ?? undefined,
  tripCount: revenue.tripCount ?? undefined,
  pricePerTrip: revenue.pricePerTrip ?? undefined,
  companyRemuneration: revenue.companyRemuneration ?? undefined,
});
