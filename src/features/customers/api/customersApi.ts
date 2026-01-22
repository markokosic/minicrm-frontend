import { api } from '@/lib/apiClient';
import { ApiResponse } from '@/types/api.types';
import { Customer } from '../types/customersTypes';

// export const createCompany = async (payload: CompanyData): Promise<LoginResponse> => {
//   return await api.post('/customers', payload);
// };

// export const createPerson = async (payload: PersonData): Promise<LoginResponse> => {
//   return await api.post('/customers', payload);
// };

export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  return await api.get(`/customers`);
};

export const getCustomer = async ({ customerId }: { customerId: number }) => {
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
