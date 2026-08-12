import { useUrlFilters } from '@/common/hooks/useUrlFilters';
import { parseRevenueFilters } from '../utils/revenue-filters.utils';

export const useRevenueFilters = () => {
  const { getFilter } = useUrlFilters();
  return parseRevenueFilters(getFilter);
};

