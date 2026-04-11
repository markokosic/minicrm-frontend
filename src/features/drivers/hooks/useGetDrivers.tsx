import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PaginatedList } from '@/common/types/api-types';
import { getDrivers } from '../drivers-api';
import { Driver } from '../drivers-types';

type useGetCustomersOptions = Omit<
  UseQueryOptions<PaginatedList<Driver[]>, Error>,
  'queryKey' | 'queryFn'
>;

export function useGetDrivers(options: useGetCustomersOptions = {}) {
   return useQuery<PaginatedList<Driver[]>, Error>({
    queryKey: ['drivers'],
    queryFn: async () => {
      const resp = await getDrivers();
      if (!resp.success) {
        throw new Error(resp.message);
      }
      return resp.data;
    },
    ...options,
  });
}
