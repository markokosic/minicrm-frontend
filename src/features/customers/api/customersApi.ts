import { ApiResponse } from '@/common/types/api-types';
import { api } from '@/lib/apiClient';
import { Customer } from '../types/customers-types';

// export const createCompany = async (payload: CompanyData): Promise<LoginResponse> => {
//   return await api.post('/customers', payload);
// };

// export const createPerson = async (payload: PersonData): Promise<LoginResponse> => {
//   return await api.post('/customers', payload);
// };

export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  return await api.get(`/customers`);
};

export const getCustomer = async ({
  customerId,
}: {
  customerId: number | string;
}): Promise<ApiResponse<Customer>> => {
  return await api.get(`/customers/${customerId}`);
};

export const updateCustomer = async ({
  customerId,
  payload,
}: {
  customerId: number;
  payload: any;
}) => {
  return await api.get(`/customers/${customerId}`, payload);
};
