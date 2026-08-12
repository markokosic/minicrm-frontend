import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { CarResponse } from '@/api/generated/model';
import { mapCarsToComboboxOptions, mapCarsToOptions } from '../utils/car-options.utils';

export const useCarOptions = () => {
  const { data: cars = [], isLoading, error } = useGetAllCars<CarResponse[]>(
    { pageable: {} },
    {
      query: {
        select: (response) => response.data?.content ?? [],
      },
    }
  );

  const carOptions = mapCarsToOptions(cars);
  const carComboboxOptions = mapCarsToComboboxOptions(cars);

  return {
    carOptions,
    carComboboxOptions,
    cars,
    isLoading,
    error,
  };
};

