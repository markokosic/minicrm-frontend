import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCustomers } from '../api/customersApi';

type useGetCustomersOptions = Omit<UseQueryOptions<any[], Error>, 'queryKey' | 'queryFn'>;

export function useGetCustomers({ ...options }: any = {}) {
  return useQuery<any[], Error>({
    queryKey: ['customers'],
    queryFn: getCustomers,
    ...options,
  });
}
