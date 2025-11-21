import { api } from '@/lib/apiClient';
import { CompanyData, PersonData } from '../types/customersTypes';
import { LoginResponse } from '@/modules/auth/types/authTypes';

export const createCompany = async (payload: CompanyData): Promise<LoginResponse> => {
  return await api.post('/customers', payload);
};

export const createPerson = async (payload: PersonData): Promise<LoginResponse> => {
  return await api.post('/customers', payload);
};

export const getCompanies = async () => {
  return await api.get('/companies');
};

export const getCustomer = async ({ customerId }: { customerId: number }) => {
  return await api.get(`/customers/${customerId}`);
};

export const getCustomerTypes = async () => {
  return await api.get(`/customers/types`);
};

export const updateCustomer = async ({ customerId, payload }: { customerId: number; payload: any }) => {
  return await api.get(`/customers/${customerId}`, payload);
};
