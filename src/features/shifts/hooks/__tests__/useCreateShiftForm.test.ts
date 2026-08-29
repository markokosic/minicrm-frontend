import { renderHook } from '@testing-library/react';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { useAdminCreateShiftForm } from '../useAdminCreateShiftForm';

describe('useCreateShiftForm Hook', () => {
  it('initializes form with default values', () => {
    const { Wrapper } = createTestAppWrapper();
    const { result } = renderHook(() => useAdminCreateShiftForm(), { wrapper: Wrapper });

    expect(result.current.methods.getValues()).toEqual({
      driverId: undefined,
      carId: undefined,
      shiftStart: '',
      shiftEnd: '',
      odometerStart: undefined,
      odometerEnd: undefined,
      status: 'APPROVED',
      revenues: [],
    });
    expect(result.current.isPending).toBe(false);
  });
});
