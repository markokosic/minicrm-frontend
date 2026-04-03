import { ApiResponse } from 'src/common/types/api-types';
import { api } from 'src/lib/apiClient';
import {
  CreateDriverPayload,
  Driver,
  DriverId,
  UpdateDriverPayload,
} from '@/features/drivers/drivers-types';


export const getDrivers = async (): Promise<ApiResponse<Driver[]>> => {
  return await api.get(`/drivers`);
};

export const getDriver = async ({
  driverId,
}: {
  driverId: DriverId;
}): Promise<ApiResponse<Driver>> => {
  return await api.get(`/drivers/${driverId}`);
};

export const updateDriver = async ({
  driverId,
  payload,
}: {
  driverId: DriverId;
  payload: UpdateDriverPayload;
}): Promise<ApiResponse<Driver>> => {
  return await api.patch(`/drivers/${driverId}`, payload);
};

export const addDriver = async ({
  payload,
}: {
  payload: CreateDriverPayload;
}): Promise<ApiResponse<Driver>> => {
  return await api.post(`/drivers`, payload);
};
