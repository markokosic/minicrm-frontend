import { Driver, UpdateDriverRequest } from './drivers-types';

export const mapDriverToUpdateDriverPayload = (driver: Driver): UpdateDriverRequest => {
  const { id, ...driverData } = driver;
  return driverData;
};
