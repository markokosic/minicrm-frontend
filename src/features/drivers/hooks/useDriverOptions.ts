import { useGetAllDriversForSelect } from '@/api/generated/endpoints/drivers/drivers';
import { mapDriversToComboboxOptions, mapDriversToOptions } from '../utils/driver-options.utils';

export const useDriverOptions = () => {
  const { data, isLoading, error } = useGetAllDriversForSelect();

  const drivers = data?.data ?? [];

  const driverOptions = mapDriversToOptions(drivers);
  const driverComboboxOptions = mapDriversToComboboxOptions(drivers);

  return {
    driverOptions,
    driverComboboxOptions,
    drivers,
    isLoading,
    error,
  };
};

