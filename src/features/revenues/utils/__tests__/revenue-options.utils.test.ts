import { describe, expect, it } from 'vitest';
import {
  computeIsPendingOptions,
  mapCarsToRevenueOptions,
  mapDriversToRevenueOptions,
} from '../revenue-options.utils';

describe('revenue-options.utils', () => {
  it('mapCarsToRevenueOptions should map cars array', () => {
    const cars = [{ id: 1, licensePlate: 'B-123', model: 'M3', brand: 'BMW' }];
    expect(mapCarsToRevenueOptions(cars)).toEqual([{ label: 'B-123 M3 BMW', value: 1 }]);
  });

  it('mapDriversToRevenueOptions should map drivers array', () => {
    const drivers = [{ id: 5, firstName: 'John', lastName: 'Doe' }];
    expect(mapDriversToRevenueOptions(drivers)).toEqual([{ label: 'John Doe', value: 5 }]);
  });

  it('computeIsPendingOptions should return true only when pending and options are empty', () => {
    expect(computeIsPendingOptions(true, false, 0, 0)).toBe(true);
    expect(computeIsPendingOptions(true, false, 1, 0)).toBe(false);
    expect(computeIsPendingOptions(false, false, 0, 0)).toBe(false);
  });
});
