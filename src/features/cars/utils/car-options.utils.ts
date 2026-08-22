import { CarResponse } from '@/api/generated/model';

export interface CarOption {
  value: string;
  label: string;
  id?: number;
}

export const formatCarLabel = (car: CarResponse): string => {
  return `${car.licensePlate || ''} ${car.model || ''} ${car.brand || ''}`.trim();
};

export const mapCarsToOptions = (cars: CarResponse[]): CarOption[] => {
  return cars.map((car) => ({
    value: car.id !== undefined && car.id !== null ? String(car.id) : '',
    label: formatCarLabel(car),
    id: car.id,
  }));
};
