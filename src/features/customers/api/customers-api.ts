import { ApiResponse } from '@/common/types/api-types';
import { api } from '@/lib/apiClient';
import { Customer, CustomerId } from '../types/customers-types';

export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  return await api.get(`/customers`);
};

export const getCustomer = async ({
  customerId,
}: {
  customerId: CustomerId;
}): Promise<ApiResponse<Customer>> => {
  return await api.get(`/customers/${customerId}`);
};

export const updateCustomer = async ({
  customerId,
  payload,
}: {
  customerId: CustomerId;
  payload: any;
}): Promise<ApiResponse<Customer>> => {
  return await api.patch(`/customers/${customerId}`, payload);
};

export const addCustomer = async ({
  payload,
}: {
  payload: any;
}): Promise<ApiResponse<Customer>> => {
  return await api.post(`/customers`, payload);
};
