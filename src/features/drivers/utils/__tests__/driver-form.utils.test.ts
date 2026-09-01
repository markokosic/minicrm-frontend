import { describe, expect, it } from 'vitest';
import { getDriverUpdateFormDefaultValues } from '../driver-form.utils';

describe('driver-form.utils', () => {
  it('getDriverUpdateFormDefaultValues should map driver response to form default values', () => {
    const driver = {
      id: 1,
      firstName: 'Max',
      lastName: 'Mustermann',
      phone: '12345678',
      email: 'max@example.com',
      currentRemunerationConfigs: [
        {
          remunerationModelType: 'FLAT_RATE' as const,
          driverFlatRatePayoutPerShift: 50,
        },
      ],
    };

    expect(getDriverUpdateFormDefaultValues(driver as never)).toEqual({
      firstName: 'Max',
      lastName: 'Mustermann',
      phone: '12345678',
      email: 'max@example.com',
      remunerationConfigs: [
        {
          remunerationModelType: 'FLAT_RATE',
          driverFlatRatePayoutPerShift: 50,
        },
      ],
    });
  });

  it('getDriverUpdateFormDefaultValues should fallback to empty values when fields are null or undefined', () => {
    const driver = { id: 1 };
    expect(getDriverUpdateFormDefaultValues(driver as never)).toEqual({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      remunerationConfigs: [],
    });
  });
});
