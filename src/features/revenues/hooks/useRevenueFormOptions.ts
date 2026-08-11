import { CarResponse as Car } from '@/api/generated/model';
import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { useGetAllDrivers } from '@/api/generated/endpoints/drivers/drivers';

export interface RevenueSelectOption {
  label: string;
  value: number;
}

export const useRevenueFormOptions = () => {
  const { data: driversResponse, isPending: isPendingDrivers } = useGetAllDrivers({
    pageable: {},
  });
  const drivers = driversResponse?.data?.content || [];

  const { data: cars = [], isLoading: isPendingCars } = useGetAllCars<Car[]>(
    { pageable: {} },
    {
      query: {
        select: (response) => response.data?.content || [],
      },
    }
  );

  const carOptions: RevenueSelectOption[] = cars
    .filter((car) => car.id !== undefined)
    .map((car) => ({
      label: `${car.licensePlate} ${car.model} ${car.brand}`,
      value: car.id!,
    }));

  const driverOptions: RevenueSelectOption[] = drivers
    .filter((driver) => driver.id !== undefined)
    .map((driver) => ({
      label: `${driver.firstName} ${driver.lastName}`,
      value: driver.id!,
    }));

  const isPendingOptions = (isPendingCars || isPendingDrivers) && cars.length === 0 && drivers.length === 0;

  return {
    drivers,
    cars,
    carOptions,
    driverOptions,
    isPendingOptions,
  };
};
