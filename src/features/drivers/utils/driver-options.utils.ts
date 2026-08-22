import { DriverSelect } from '@/api/generated/model';

export interface DriverOption {
  value: string;
  label: string;
  id?: number;
}

export const mapDriversToOptions = (drivers: DriverSelect[]): DriverOption[] => {
  return drivers.map((driver) => ({
    value: driver.id !== undefined && driver.id !== null ? String(driver.id) : '',
    label: driver.fullName || '',
    id: driver.id,
  }));
};

export const mapDriversToComboboxOptions = (drivers: DriverSelect[]) => {
  return drivers.map((driver) => ({
    value: driver.id!,
    label: driver.fullName!,
  }));
};
