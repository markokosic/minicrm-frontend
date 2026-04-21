import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDriver } from '../drivers-api';
import { Driver, DriverId, UpdateDriverRequest } from '../drivers-types';

interface UpdateDriverProps {
  driverId: DriverId;
  data: UpdateDriverRequest;
}

export const useUpdateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation<Driver, Error, UpdateDriverProps>({
    mutationFn: async ({ driverId, data }) => {
      const resp = await updateDriver({ driverId, payload: data });
      if (!resp?.success) {
        throw new Error(resp?.message);
      }
      return resp.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['drivers', data.id] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
};
