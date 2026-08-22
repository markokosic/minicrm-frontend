import { UpdateDriverMutationBody } from '@/api/generated/endpoints/drivers/drivers';
import { DriverResponse } from '@/api/generated/model';

export const getDriverUpdateFormDefaultValues = (driver: DriverResponse): UpdateDriverMutationBody => ({
  firstName: driver.firstName ?? '',
  lastName: driver.lastName ?? '',
  phone: driver.phone ?? '',
  email: driver.email ?? '',
  remunerationConfigs: driver.currentRemunerationConfigs
    ? (driver.currentRemunerationConfigs as UpdateDriverMutationBody['remunerationConfigs'])
    : [],
});
