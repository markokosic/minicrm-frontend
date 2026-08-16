import { Primitive } from '@mantine/core';
import { CarResponse } from '@/api/generated/model';

export interface CarOption {
  value: Primitive;
  label: string;
}

export const formatCarLabel = (car: CarResponse): string => {
  return `${car.licensePlate || ''} ${car.model || ''} ${car.brand || ''}`.trim();
};

export const mapCarsToOptions = (cars: CarResponse[]): CarOption[] => {
  return cars.map((car) => ({
    value: car.id!,
    label: formatCarLabel(car),
  }));
};
