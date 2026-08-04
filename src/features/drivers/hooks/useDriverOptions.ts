import { useGetAllDriversForSelect } from '@/api/generated/endpoints/drivers/drivers';

export const useDriverOptions = () => {
  const { data, isLoading, error } = useGetAllDriversForSelect();

  const drivers = data?.data ?? [];

  const driverOptions = drivers.map((driver) => ({
    value: driver.id?.toString() || '',
    label: driver.fullName || '',
    id: driver.id!,
  }));

  const driverComboboxOptions = drivers.map((driver) => ({
    value: driver.id!,
    label: driver.fullName || '',
  }));

  return {
    driverOptions,
    driverComboboxOptions,
    drivers,
    isLoading,
    error,
  };
};
