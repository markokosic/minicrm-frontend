import { renderHook, act } from '@testing-library/react';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { useUpdateFlatRateForm } from '../useUpdateFlatRateForm';

describe('useUpdateFlatRateForm Hook', () => {
  it('resets form with provided flatRate values', () => {
    const { Wrapper } = createTestAppWrapper();
    const mockFlatRate = { id: 1, name: 'Wien -> Airport', defaultPrice: 45 };

    const { result } = renderHook(
      () => useUpdateFlatRateForm({ flatRate: mockFlatRate }),
      { wrapper: Wrapper }
    );

    expect(result.current.methods.getValues()).toEqual({
      name: 'Wien -> Airport',
      defaultPrice: 45,
    });
  });

  it('updates values when flatRate prop changes', () => {
    const { Wrapper } = createTestAppWrapper();
    const mockFlatRate1 = { id: 1, name: 'Wien -> Airport', defaultPrice: 45 };
    const mockFlatRate2 = { id: 2, name: 'Wien -> Graz', defaultPrice: 150 };

    const { result, rerender } = renderHook(
      ({ flatRate }) => useUpdateFlatRateForm({ flatRate }),
      {
        wrapper: Wrapper,
        initialProps: { flatRate: mockFlatRate1 },
      }
    );

    expect(result.current.methods.getValues()).toEqual({
      name: 'Wien -> Airport',
      defaultPrice: 45,
    });

    rerender({ flatRate: mockFlatRate2 });

    expect(result.current.methods.getValues()).toEqual({
      name: 'Wien -> Graz',
      defaultPrice: 150,
    });
  });
});
