import { LoginResponse, User } from '@/modules/auth/types/authTypes';
import { api } from './apiClient';
import { loginFormSchema, registerFormSchema } from '@/validation/authSchema';
import { z } from 'zod';
import { configureAuth } from '@/modules/auth/utils/configureAuth';
import { ApiResponse } from '@/types/apiTypes';

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');

  return response?.data;
};

const logout = () => {
  return api.post('/auth/logout');
};

export type LoginInput = z.infer<typeof loginFormSchema>;

const login = async (payload: LoginInput): Promise<User> => {
  try {
    const res: LoginResponse = await api.post('/auth/login', payload);

    if (!res.success) {
      throw new Error(res.message);
    }

    return res?.data?.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export type RegisterInput = z.infer<typeof registerFormSchema>;

const register = (payload: RegisterInput): Promise<ApiResponse> => {
  return api.post('/auth/register', payload);
};

const authConfig = {
  userFn: getUser,
  userKey: ['authenticated-user'],
  logoutFn: logout,
  loginFn: async (data: LoginInput) => {
    const user = await login(data);
    return user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await register(data);
    return response.data;
  },
};

export const { useUser, useLogin, useLogout, useRegister } = configureAuth(authConfig);
