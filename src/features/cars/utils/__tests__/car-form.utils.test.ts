import { describe, expect, it } from 'vitest';
import { getCarUpdateFormDefaultValues } from '../car-form.utils';

describe('car-form.utils', () => {
  it('getCarUpdateFormDefaultValues should map car response to form default values', () => {
    const car = {
      id: 10,
      brand: 'Audi',
      model: 'A4',
      licensePlate: 'IN-A 4444',
      horsepower: '190',
    };

    expect(getCarUpdateFormDefaultValues(car)).toEqual({
      brand: 'Audi',
      model: 'A4',
      licensePlate: 'IN-A 4444',
      horsepower: '190',
    });
  });

  it('getCarUpdateFormDefaultValues should fallback to empty strings for null or undefined properties', () => {
    const car = { id: 10 };
    expect(getCarUpdateFormDefaultValues(car)).toEqual({
      brand: '',
      model: '',
      licensePlate: '',
      horsepower: '',
    });
  });
});
