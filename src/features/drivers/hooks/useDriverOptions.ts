import { useGetAllDriversForSelect } from '@/api/generated/endpoints/drivers/drivers';
import { mapDriversToOptions } from '../utils/driver-options.utils';

export const useDriverSelectOptions = () => {
  const { data, isLoading, error } = useGetAllDriversForSelect();

  const drivers = data?.data ?? [];

  const driverOptions = mapDriversToOptions(drivers);

  return {
    driverOptions,
    drivers,
    isLoading,
    error,
  };
};

