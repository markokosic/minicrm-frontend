import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { updateCustomer } from '../api/customers-api';
import { Customer, CustomerId } from '../types/customers-types';

interface UpdateCustomerInput {
  id: CustomerId;
  data: Partial<Customer>;
}

interface UseUpdateCustomerOptions extends Omit<
  UseMutationOptions<Customer, Error, UpdateCustomerInput>,
  'mutationFn'
> {}

export function useUpdateCustomer(options?: UseUpdateCustomerOptions) {
  const queryClient = useQueryClient();

  return useMutation<Customer, Error, UpdateCustomerInput>({
    mutationFn: async ({ id, data }) => {
      const resp = await updateCustomer({ customerId: id, payload: data });
      if (!resp?.success) {
        throw new Error(resp?.message);
      }
      return resp.data;
    },
    onSuccess: (updatedCustomer, variables, context) => {
      queryClient.setQueryData(['customer', variables.id], updatedCustomer);
      queryClient.invalidateQueries({ queryKey: ['customer', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      //   options?.onSuccess?.(updatedCustomer, variables, context);
    },
    ...options,
  });
}
