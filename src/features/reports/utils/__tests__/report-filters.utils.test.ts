import { describe, expect, it } from 'vitest';
import { parseReportFilters } from '../report-filters.utils';

describe('report-filters.utils', () => {
  it('parseReportFilters should parse URL filters with given values', () => {
    const mockGetFilter = (key: string) => {
      if (key === 'dateFrom') {
        return '2026-02-01';
      }
      if (key === 'dateTo') {
        return '2026-02-28';
      }
      if (key === 'driverId') {
        return '10';
      }
      if (key === 'groupBy') {
        return 'MONTH';
      }
      return null;
    };

    expect(parseReportFilters(mockGetFilter)).toEqual({
      dateFrom: '2026-02-01',
      dateTo: '2026-02-28',
      driverId: '10',
      groupBy: 'MONTH',
    });
  });

  it('parseReportFilters should use default fallback values when filters are empty', () => {
    const mockGetFilter = () => null;

    const result = parseReportFilters(mockGetFilter);
    expect(result.driverId).toBeNull();
    expect(result.groupBy).toBe('DAY');
    expect(result.dateFrom).toBeDefined();
    expect(result.dateTo).toBeDefined();
  });
});
