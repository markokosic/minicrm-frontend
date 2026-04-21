import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { createDriver } from '../drivers-api';
import { CreateDriverRequest, Driver } from '../drivers-types';

interface CreateDriverProps {
  data: CreateDriverRequest;
}

interface UseCreateDriverOptions extends Omit<
  UseMutationOptions<Driver, Error, CreateDriverProps>,
  'mutationFn'
> {}

export function useCreateDriver(options?: UseCreateDriverOptions) {
  const queryClient = useQueryClient();

  return useMutation<Driver, Error, CreateDriverProps>({
    mutationFn: async ({ data }) => {
      const resp = await createDriver({ payload: data });
      if (!resp?.success) {
        throw new Error(resp?.message);
      }
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
    ...options,
  });
}
