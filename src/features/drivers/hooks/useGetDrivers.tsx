import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getDrivers } from '../drivers-api';
import { Driver } from '../drivers-types';

type useGetCustomersOptions = Omit<UseQueryOptions<Driver[], Error>, 'queryKey' | 'queryFn'>;

export function useGetDrivers(options: useGetCustomersOptions = {}) {
  return useQuery<Driver[], Error>({
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
