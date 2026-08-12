import { describe, expect, it } from 'vitest';
import { RemunerationModelType } from '@/features/remuneration';
import { getRevenueEditFormDefaultValues } from '../revenue-edit-form.utils';

describe('revenue-edit-form.utils', () => {
  it('getRevenueEditFormDefaultValues should transform DailyRevenueResponse to form values', () => {
    const mockRevenue = {
      id: 100,
      driver: { id: 1 },
      car: { id: 2 },
      date: '2026-05-10',
      kilometersDriven: 300,
      kilometersFrom: 1000,
      kilometersTo: 1300,
      drivingStartTime: '08:00:00',
      drivingEndTime: '16:00:00',
      remunerationModelType: 'FLAT_RATE',
      revenue: 500,
      tripCount: 10,
      pricePerTrip: 50,
      companyRemuneration: 100,
    };

    expect(getRevenueEditFormDefaultValues(mockRevenue as never)).toEqual({
      driverId: 1,
      carId: 2,
      date: '2026-05-10',
      kilometersDriven: 300,
      kilometersFrom: 1000,
      kilometersTo: 1300,
      drivingStartTime: '08:00',
      drivingEndTime: '16:00',
      driverRemunerationType: RemunerationModelType.FLAT_RATE,
      revenue: 500,
      tripCount: 10,
      pricePerTrip: 50,
      companyRemuneration: 100,
    });
  });
});
