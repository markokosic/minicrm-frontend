import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCustomers } from '../api/customers-api';
import { Customer } from '../types/customers-types';

type useGetCustomersOptions = Omit<UseQueryOptions<Customer[], Error>, 'queryKey' | 'queryFn'>;

export function useGetCustomers(options: useGetCustomersOptions = {}) {
  return useQuery<Customer[], Error>({
    queryKey: ['customers'],
    queryFn: async () => {
      const resp = await getCustomers();
      if (!resp.success) {
        throw new Error(resp.message);
      }
      return resp.data;
    },
    ...options,
  });
}
