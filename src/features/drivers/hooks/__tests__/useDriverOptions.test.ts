import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@/testing/testUtils';
import * as driversApi from '@/api/generated/endpoints/drivers/drivers';
import { useDriverSelectOptions } from '../useDriverOptions';

vi.mock('@/api/generated/endpoints/drivers/drivers', async () => {
  const actual = await vi.importActual('@/api/generated/endpoints/drivers/drivers');
  return {
    ...actual,
    useGetAllDriversForSelect: vi.fn(),
  };
});

describe('useDriverSelectOptions', () => {
  it('should return empty options when API returns no drivers', () => {
    vi.mocked(driversApi.useGetAllDriversForSelect).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof driversApi.useGetAllDriversForSelect>);

    const { result } = renderHook(() => useDriverSelectOptions());

    expect(result.current.driverOptions).toEqual([]);
  });

  it('should return formatted driver options when API returns drivers', () => {
    const mockDrivers = [
      { id: 10, fullName: 'John Doe' },
      { id: 20, fullName: 'Jane Smith' },
    ];

    vi.mocked(driversApi.useGetAllDriversForSelect).mockReturnValue({
      data: { data: mockDrivers },
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof driversApi.useGetAllDriversForSelect>);

    const { result } = renderHook(() => useDriverSelectOptions());

    expect(result.current.driverOptions).toEqual([
      { value: 10, label: 'John Doe' },
      { value: 20, label: 'Jane Smith' },
    ]);
  });
});
