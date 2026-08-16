import { Primitive } from '@mantine/core';
import { DriverSelect } from '@/api/generated/model';

export interface DriverOption {
  value: Primitive;
  label: string;
}

export const mapDriversToOptions = (drivers: DriverSelect[]): DriverOption[] => {
  return drivers.map((driver) => ({
    value: driver.id!,
    label: driver.fullName!,
  }));
};
