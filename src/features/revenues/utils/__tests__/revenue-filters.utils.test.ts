import { describe, expect, it } from 'vitest';
import { parseRevenueFilters } from '../revenue-filters.utils';

describe('revenue-filters.utils', () => {
  it('parseRevenueFilters should parse string filters correctly', () => {
    const mockGetFilter = (key: string) => {
      if (key === 'driverId') {
        return '42';
      }
      if (key === 'dateFrom') {
        return '2026-01-01';
      }
      if (key === 'dateTo') {
        return '2026-01-31';
      }
      return null;
    };

    expect(parseRevenueFilters(mockGetFilter)).toEqual({
      driverId: 42,
      dateFrom: '2026-01-01',
      dateTo: '2026-01-31',
    });
  });

  it('parseRevenueFilters should return undefined for missing filter values', () => {
    const mockGetFilter = () => null;
    expect(parseRevenueFilters(mockGetFilter)).toEqual({
      driverId: undefined,
      dateFrom: undefined,
      dateTo: undefined,
    });
  });
});
