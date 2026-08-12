import { describe, expect, it } from 'vitest';
import {
  formatCarLabel,
  mapCarsToComboboxOptions,
  mapCarsToOptions,
} from '../car-options.utils';

describe('car-options.utils', () => {
  const mockCars = [
    { id: 1, licensePlate: 'B-MW 123', model: 'Model 3', brand: 'Tesla' },
    { id: 2, licensePlate: 'M-XY 999', model: 'Golf', brand: 'VW' },
  ];

  it('formatCarLabel should format car label properly', () => {
    expect(formatCarLabel(mockCars[0])).toBe('B-MW 123 Model 3 Tesla');
  });

  it('mapCarsToOptions should map cars array to select options', () => {
    const result = mapCarsToOptions(mockCars);
    expect(result).toEqual([
      { value: '1', label: 'B-MW 123 Model 3 Tesla', id: 1 },
      { value: '2', label: 'M-XY 999 Golf VW', id: 2 },
    ]);
  });

  it('mapCarsToComboboxOptions should map cars array to combobox options', () => {
    const result = mapCarsToComboboxOptions(mockCars);
    expect(result).toEqual([
      { value: 1, label: 'B-MW 123 Model 3 Tesla' },
      { value: 2, label: 'M-XY 999 Golf VW' },
    ]);
  });
});
