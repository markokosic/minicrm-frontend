import { useGetAllCars } from '@/api/generated/endpoints/cars/cars';
import { CarResponse } from '@/api/generated/model';

export const useCarOptions = () => {
  const { data: cars = [], isLoading, error } = useGetAllCars<CarResponse[]>(
    { pageable: {} },
    {
      query: {
        select: (response) => response.data?.content ?? [],
      },
    }
  );

  const carOptions = cars.map((car) => ({
    value: car.id?.toString() || '',
    label: `${car.licensePlate || ''} ${car.model || ''} ${car.brand || ''}`.trim(),
    id: car.id!,
  }));

  const carComboboxOptions = cars.map((car) => ({
    value: car.id!,
    label: `${car.licensePlate || ''} ${car.model || ''} ${car.brand || ''}`.trim(),
  }));

  return {
    carOptions,
    carComboboxOptions,
    cars,
    isLoading,
    error,
  };
};
