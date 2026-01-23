import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCustomer } from '../api/customersApi';
import { Customer } from '../types/customers-types';

interface UseGetCustomerParams {
  id: number | string;
  options?: Omit<UseQueryOptions<Customer, Error>, 'queryKey' | 'queryFn' | 'enabled'>;
}

export function useGetCustomer({ id, options }: UseGetCustomerParams) {
  return useQuery<Customer, Error>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const resp = await getCustomer({ customerId: id });
      if (!resp.success) {
        throw new Error(resp.message);
      }
      return resp.data;
    },
    ...options,
  });
}
