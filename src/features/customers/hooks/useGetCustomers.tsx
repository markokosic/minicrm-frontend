import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCompanies } from '../api/customersApi';

type useGetCustomersOptions = Omit<UseQueryOptions<any[], Error>, 'queryKey' | 'queryFn'>;

export function useGetCustomers({ ...options }: any = {}) {
  return useQuery<any[], Error>({
    queryKey: ['companies'],
    queryFn: getCompanies,
    ...options,
  });
}
