import { describe, expect, it } from 'vitest';
import { DriverResponse } from '@/api/generated/model';
import { RemunerationModelType } from '@/features/remuneration';
import {
  calculateFlatRateRevenue,
  calculateKilometersDriven,
  checkWeeklySettlement,
  findDriverById,
  findSelectedRemunerationConfig,
  getDriverRemunerationConfigOptions,
} from '../revenue-form-calculations.utils';

describe('revenue-form-calculations.utils', () => {
  const mockDriver: DriverResponse = {
    id: 1,
    firstName: 'Max',
    lastName: 'Mustermann',
    currentRemunerationConfigs: [
      {
        remunerationModelType: RemunerationModelType.FLAT_RATE,
        flatRateFee: 25,
      },
    ],
  };

  it('findDriverById should find driver by ID', () => {
    expect(findDriverById([mockDriver], 1)).toEqual(mockDriver);
    expect(findDriverById([mockDriver], 2)).toBeUndefined();
    expect(findDriverById(undefined, 1)).toBeUndefined();
  });

  it('getDriverRemunerationConfigOptions should format options with t', () => {
    const dummyT = (key: string) => `trans:${key}`;
    const options = getDriverRemunerationConfigOptions(mockDriver, dummyT);
    expect(options).toEqual([
      {
        label: 'trans:app:remuneration.type.flatRate',
        value: RemunerationModelType.FLAT_RATE,
      },
    ]);
  });

  it('findSelectedRemunerationConfig should find matching config', () => {
    const config = findSelectedRemunerationConfig(mockDriver, RemunerationModelType.FLAT_RATE);
    expect(config).toEqual({
      remunerationModelType: RemunerationModelType.FLAT_RATE,
      flatRateFee: 25,
    });
  });

  it('checkWeeklySettlement should evaluate settlement day', () => {
    const weeklyConfig = {
      remunerationModelType: RemunerationModelType.WEEKLY_FIXED_RATE,
      settlementDay: 3,
      weeklyFixedCompanySettlement: 100,
    };

    expect(checkWeeklySettlement(weeklyConfig, 3).isWeeklyPaymentToday).toBe(true);
    expect(checkWeeklySettlement(weeklyConfig, 1).isWeeklyPaymentToday).toBe(false);
    expect(checkWeeklySettlement(null).isWeeklyPaymentToday).toBe(false);
  });

  it('calculateFlatRateRevenue should return product of tripCount and pricePerTrip', () => {
    expect(calculateFlatRateRevenue(4, 25)).toBe(100);
    expect(calculateFlatRateRevenue(null, 25)).toBeNull();
    expect(calculateFlatRateRevenue(4, undefined)).toBeNull();
  });

  it('calculateKilometersDriven should calculate non-negative difference', () => {
    expect(calculateKilometersDriven(100, 250)).toBe(150);
    expect(calculateKilometersDriven(250, 100)).toBeNull();
    expect(calculateKilometersDriven(null, 100)).toBeNull();
  });
});
