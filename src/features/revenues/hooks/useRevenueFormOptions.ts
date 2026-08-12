import { CarResponse as Car } from '@/api/generated/model';
import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { useGetAllDrivers } from '@/api/generated/endpoints/drivers/drivers';
import {
  computeIsPendingOptions,
  mapCarsToRevenueOptions,
  mapDriversToRevenueOptions,
  RevenueSelectOption,
} from '../utils/revenue-options.utils';

export type { RevenueSelectOption };

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

  const carOptions = mapCarsToRevenueOptions(cars);
  const driverOptions = mapDriversToRevenueOptions(drivers);

  const isPendingOptions = computeIsPendingOptions(
    isPendingCars,
    isPendingDrivers,
    cars.length,
    drivers.length
  );

  return {
    drivers,
    cars,
    carOptions,
    driverOptions,
    isPendingOptions,
  };
};

