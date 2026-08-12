import { CarResponse as Car, DriverResponse as Driver } from '@/api/generated/model';

export interface RevenueSelectOption {
  label: string;
  value: number;
}

export const mapCarsToRevenueOptions = (cars: Car[]): RevenueSelectOption[] => {
  return cars
    .filter((car) => car.id !== undefined)
    .map((car) => ({
      label: `${car.licensePlate || ''} ${car.model || ''} ${car.brand || ''}`.trim(),
      value: car.id!,
    }));
};

export const mapDriversToRevenueOptions = (drivers: Driver[]): RevenueSelectOption[] => {
  return drivers
    .filter((driver) => driver.id !== undefined)
    .map((driver) => ({
      label: `${driver.firstName || ''} ${driver.lastName || ''}`.trim(),
      value: driver.id!,
    }));
};

export const computeIsPendingOptions = (
  isPendingCars: boolean,
  isPendingDrivers: boolean,
  carCount: number,
  driverCount: number
): boolean => {
  return (isPendingCars || isPendingDrivers) && carCount === 0 && driverCount === 0;
};
