import { DriverSelectResponse } from '@/api/generated/model';

export interface DriverOption {
  value: string;
  label: string;
  id: number;
}

export interface DriverComboboxOption {
  value: number;
  label: string;
}

export const mapDriversToOptions = (drivers: DriverSelectResponse[]): DriverOption[] => {
  return drivers.map((driver) => ({
    value: driver.id?.toString() || '',
    label: driver.fullName || '',
    id: driver.id!,
  }));
};

export const mapDriversToComboboxOptions = (drivers: DriverSelectResponse[]): DriverComboboxOption[] => {
  return drivers.map((driver) => ({
    value: driver.id!,
    label: driver.fullName || '',
  }));
};
