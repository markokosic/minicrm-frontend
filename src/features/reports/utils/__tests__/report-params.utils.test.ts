import { describe, expect, it } from 'vitest';
import { mapRevenueReportParamsToApiParams } from '../report-params.utils';

describe('report-params.utils', () => {
  it('mapRevenueReportParamsToApiParams should convert RevenueReportParams to API params', () => {
    const params = {
      dateFrom: '2026-01-01',
      dateTo: '2026-01-31',
      driverId: '15',
      groupBy: 'MONTH' as const,
    };

    expect(mapRevenueReportParamsToApiParams(params)).toEqual({
      dateFrom: '2026-01-01',
      dateTo: '2026-01-31',
      driverId: 15,
      groupBy: 'MONTH',
    });
  });

  it('mapRevenueReportParamsToApiParams should handle empty or undefined values', () => {
    const params = {
      dateFrom: '',
      dateTo: '',
      driverId: null,
      groupBy: undefined,
    };

    expect(mapRevenueReportParamsToApiParams(params)).toEqual({
      dateFrom: '',
      dateTo: '',
      driverId: undefined,
      groupBy: undefined,
    });
  });
});
