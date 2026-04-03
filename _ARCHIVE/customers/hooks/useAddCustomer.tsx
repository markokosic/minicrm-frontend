import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { addCustomer } from '../api/customers-api';
import { AddCustomer, Customer } from '../types/customers-types';

interface AddCustomerInput {
  data: AddCustomer;
}

interface UseUpdateCustomerOptions extends Omit<
  UseMutationOptions<Customer, Error, AddCustomerInput>,
  'mutationFn'
> {}

export function useAddCustomer(options?: UseUpdateCustomerOptions) {
  const queryClient = useQueryClient();

  return useMutation<Customer, Error, AddCustomerInput>({
    mutationFn: async ({ data }) => {
      const resp = await addCustomer({ payload: data });
      if (!resp?.success) {
        throw new Error(resp?.message);
      }
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    ...options,
  });
}
