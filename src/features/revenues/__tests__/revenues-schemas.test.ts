import { describe, expect, it } from 'vitest';
import type { TFunction } from 'i18next';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { getCreateRevenueRecordSchema } from '../revenues-schemas';

describe('getCreateRevenueRecordSchema', () => {
  const dummyT = ((key: string) => key) as unknown as TFunction;
  const schema = getCreateRevenueRecordSchema(dummyT);

  it('should validate correct revenue record payload', () => {
    const validData = {
      driverId: 1,
      carId: 2,
      date: '2026-01-01',
      kilometersDriven: 100,
      kilometersFrom: 1000,
      kilometersTo: 1100,
      driverRemunerationType: RemunerationModelType.FLAT_RATE,
      revenue: 250,
      tripCount: 10,
      pricePerTrip: 25,
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail when kilometersTo is less than kilometersFrom', () => {
    const invalidData = {
      driverId: 1,
      carId: 2,
      date: '2026-01-01',
      kilometersDriven: 100,
      kilometersFrom: 1100,
      kilometersTo: 1000,
      driverRemunerationType: RemunerationModelType.FLAT_RATE,
      revenue: 250,
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
