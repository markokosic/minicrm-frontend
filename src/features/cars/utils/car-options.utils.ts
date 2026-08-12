import { CarResponse } from '@/api/generated/model';

export interface CarOption {
  value: string;
  label: string;
  id: number;
}

export interface CarComboboxOption {
  value: number;
  label: string;
}

export const formatCarLabel = (car: CarResponse): string => {
  return `${car.licensePlate || ''} ${car.model || ''} ${car.brand || ''}`.trim();
};

export const mapCarsToOptions = (cars: CarResponse[]): CarOption[] => {
  return cars.map((car) => ({
    value: car.id?.toString() || '',
    label: formatCarLabel(car),
    id: car.id!,
  }));
};

export const mapCarsToComboboxOptions = (cars: CarResponse[]): CarComboboxOption[] => {
  return cars.map((car) => ({
    value: car.id!,
    label: formatCarLabel(car),
  }));
};
