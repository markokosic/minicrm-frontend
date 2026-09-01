import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { useDriverCreateShiftForm } from '../driver/useDriverCreateShiftForm';

describe('useDriverCreateShiftForm Hook', () => {
  it('initializes driver form with correct default values', () => {
    const { Wrapper } = createTestAppWrapper();
    const { result } = renderHook(() => useDriverCreateShiftForm(), { wrapper: Wrapper });

    expect(result.current.methods.getValues()).toEqual({
      carId: undefined,
      shiftStart: '',
      shiftEnd: '',
      odometerStart: undefined,
      odometerEnd: undefined,
      singleRides: [],
      flatRateCounts: {},
      flatRatePrices: {},
      weeklyRentPaid: undefined,
    });
    expect(result.current.isPending).toBe(false);
  });
});
