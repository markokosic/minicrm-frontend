import { api } from '@/lib/apiClient';
import { LoginInput, RegisterInput } from '../types/authTypes';

export const login = (data: LoginInput) => {
  return api.post('/auth/login', data);
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
