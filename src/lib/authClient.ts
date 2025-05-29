import { ApiResponse, LoginResponseData, User } from '@/modules/auth/types/authTypes';
import { api } from './apiClient';
import { loginFormSchema, registerFormSchema } from '@/validation/authSchema';
import { z } from 'zod';

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');

  return response.data;
};

const logout = () => {
  return api.post('/auth/logout');
};

export type LoginInput = z.infer<typeof loginFormSchema>;

const login = (payload: LoginInput): Promise<ApiResponse<LoginResponseData>> => {
  return api.post('/auth/login', payload);
};

export type RegisterInput = z.infer<typeof registerFormSchema>;

const register = (payload: RegisterInput): Promise<ApiResponse> => {
  return api.post('/auth/register', payload);
};
