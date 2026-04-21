import { useQuery } from '@tanstack/react-query';
import { getDriver } from '../drivers-api';
import { DriverId } from '../drivers-types';

export const useGetDriver = ({ driverId }: { driverId: DriverId }) => {
  return useQuery({
    queryKey: ['drivers', driverId],
    queryFn: async () => {
      const resp = await getDriver({ driverId });
      if (!resp?.success) {
        throw new Error(resp?.message);
      }
      return resp.data;
    },
    enabled: !!driverId,
  });
};
