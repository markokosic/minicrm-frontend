import { api } from '@/lib/apiClient';
import { LoginResponse } from '../types/authTypes';
import { LoginInput, RegisterInput } from '@/lib/auth';

export const login = async (payload: LoginInput): Promise<LoginResponse> => {
  return await api.post('/auth/login', payload);
};

export const register = (data: RegisterInput) => {
  return api.post('/auth/register', data);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const getAuthUser = () => {
  return api.get('/auth/me');
};
