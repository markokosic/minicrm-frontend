import { useUrlFilters } from '@/common/hooks/useUrlFilters';

export const useRevenueFilters = () => {
  const { getFilter } = useUrlFilters();

  const driverIdStr = getFilter('driverId');
  const driverId = driverIdStr ? Number(driverIdStr) : undefined;
  const dateFrom = getFilter('dateFrom') || undefined;
  const dateTo = getFilter('dateTo') || undefined;

  return {
    driverId,
    dateFrom,
    dateTo,
  };
};
