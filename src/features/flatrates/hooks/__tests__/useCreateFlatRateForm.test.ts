import { renderHook, act } from '@testing-library/react';
import { createTestAppWrapper } from '@/mocks/AppWrapper';
import { useCreateFlatRateForm } from '../useCreateFlatRateForm';

describe('useCreateFlatRateForm Hook', () => {
  it('initializes form with default values', () => {
    const { Wrapper } = createTestAppWrapper();
    const { result } = renderHook(() => useCreateFlatRateForm(), { wrapper: Wrapper });

    expect(result.current.methods.getValues()).toEqual({
      name: '',
      defaultPrice: undefined,
    });
    expect(result.current.isPending).toBe(false);
  });

  it('validates required fields', async () => {
    const { Wrapper } = createTestAppWrapper();
    const { result } = renderHook(() => useCreateFlatRateForm(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.methods.trigger('name');
    });

    expect(result.current.methods.formState.errors.name).toBeDefined();
  });
});
