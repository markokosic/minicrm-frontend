import { describe, expect, it } from 'vitest';
import { ShiftRevenueEntryResponseEntryCategory } from '@/api/generated/model';
import { extractShiftFlatRateOptions } from '../shift-options.utils';

describe('extractShiftFlatRateOptions', () => {
  it('returns empty array when revenues is null or undefined', () => {
    expect(extractShiftFlatRateOptions(null)).toEqual([]);
    expect(extractShiftFlatRateOptions(undefined)).toEqual([]);
  });

  it('filters out non-flat-rate revenues', () => {
    const revenues = [
      {
        id: 1,
        entryCategory: ShiftRevenueEntryResponseEntryCategory.REGULAR,
        revenue: 100,
      },
      {
        id: 2,
        entryCategory: ShiftRevenueEntryResponseEntryCategory.WEEKLY,
        revenue: 400,
      },
    ];

    expect(extractShiftFlatRateOptions(revenues)).toEqual([]);
  });

  it('maps flat rate revenues into DriverShiftFlatRateOption format with custom names', () => {
    const revenues = [
      {
        id: 1,
        entryCategory: ShiftRevenueEntryResponseEntryCategory.FLAT_RATE,
        flatRateTypeId: 10,
        flatRateTypeName: 'Flughafentransfer',
        pricePerTrip: 45,
        tripCount: 2,
        revenue: 90,
      },
    ];

    expect(extractShiftFlatRateOptions(revenues)).toEqual([
      {
        id: 10,
        name: 'Flughafentransfer',
        defaultPrice: 45,
      },
    ]);
  });

  it('falls back to provided fallbackName or default if flatRateTypeName is missing', () => {
    const revenues = [
      {
        id: 1,
        entryCategory: ShiftRevenueEntryResponseEntryCategory.FLAT_RATE,
        flatRateTypeId: 12,
        pricePerTrip: 30,
      },
    ];

    expect(extractShiftFlatRateOptions(revenues, 'Standard-Pauschale')).toEqual([
      {
        id: 12,
        name: 'Standard-Pauschale',
        defaultPrice: 30,
      },
    ]);

    expect(extractShiftFlatRateOptions(revenues)).toEqual([
      {
        id: 12,
        name: 'Pauschalfahrt',
        defaultPrice: 30,
      },
    ]);
  });
});
