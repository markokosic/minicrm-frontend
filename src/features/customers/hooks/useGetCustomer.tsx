import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCustomer } from '../api/customers-api';
import { Customer, CustomerId } from '../types/customers-types';

interface UseGetCustomerParams {
  id: CustomerId;
  options?: Omit<UseQueryOptions<Customer, Error>, 'queryKey' | 'queryFn' | 'enabled'>;
}

export function useGetCustomer({ id, options }: UseGetCustomerParams) {
  return useQuery<Customer, Error>({
    queryKey: ['customer', Number(id)],
    queryFn: async () => {
      const resp = await getCustomer({ customerId: Number(id) });
      if (!resp.success) {
        throw new Error(resp.message);
      }
      return resp.data;
    },
    enabled: !!id,
    ...options,
  });
}
