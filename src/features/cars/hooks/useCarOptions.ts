import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { CarResponse } from '@/api/generated/model';
import {mapCarsToOptions } from '../utils/car-options.utils';

export const useCarSelectOptions = () => {
  const {
    data: cars = [],
    isLoading,
    error,
  } = useGetAllCars<CarResponse[]>(
    { size: 1000 },
    {
      query: {
        select: (response) => response.data?.content ?? [],
      },
    }
  );

  const carOptions = mapCarsToOptions(cars);

  return {
    carOptions,
    cars,
    isLoading,
    error,
  };
};
