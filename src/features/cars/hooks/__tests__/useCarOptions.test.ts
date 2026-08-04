import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@/testing/testUtils';
import * as carsApi from '@/api/generated/endpoints/cars/cars';
import { useCarOptions } from '../useCarOptions';

vi.mock('@/api/generated/endpoints/cars/cars', async () => {
  const actual = await vi.importActual('@/api/generated/endpoints/cars/cars');
  return {
    ...actual,
    useGetAllCars: vi.fn(),
  };
});

describe('useCarOptions', () => {
  it('should return empty options when API returns no cars', () => {
    vi.mocked(carsApi.useGetAllCars).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCarOptions());

    expect(result.current.carOptions).toEqual([]);
    expect(result.current.carComboboxOptions).toEqual([]);
  });

  it('should format car options correctly when cars exist', () => {
    const mockCars = [
      { id: 1, licensePlate: 'B-MW 123', model: 'Model 3', brand: 'Tesla' },
    ];

    vi.mocked(carsApi.useGetAllCars).mockReturnValue({
      data: mockCars,
      isLoading: false,
      error: null,
    } as any);

    const { result } = renderHook(() => useCarOptions());

    expect(result.current.carOptions).toEqual([
      { value: '1', label: 'B-MW 123 Model 3 Tesla', id: 1 },
    ]);

    expect(result.current.carComboboxOptions).toEqual([
      { value: 1, label: 'B-MW 123 Model 3 Tesla' },
    ]);
  });
});
