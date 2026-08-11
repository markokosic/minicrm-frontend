import dayjs from 'dayjs';
import { useUrlFilters } from '@/common/hooks/useUrlFilters';
import { RevenueReportParams } from '../report-schema';

export const useReportFilters = () => {
  const { getFilter, setFilter, setFilters } = useUrlFilters();

  const dateFrom = getFilter('dateFrom') || dayjs().startOf('month').format('YYYY-MM-DD');
  const dateTo = getFilter('dateTo') || dayjs().endOf('month').format('YYYY-MM-DD');
  const driverId = getFilter('driverId') || null;
  const groupBy = (getFilter('groupBy') || 'DAY') as RevenueReportParams['groupBy'];

  const filters: RevenueReportParams = {
    dateFrom,
    dateTo,
    driverId,
    groupBy,
  };

  return {
    filters,
    setFilter,
    setFilters,
  };
};
