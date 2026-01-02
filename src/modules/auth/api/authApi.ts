import { api } from '@/lib/apiClient';
import { AuthCredentialsPayload, LoginResponseData, RegisterTenantPayload, User } from '@/modules/auth/types/authTypes';
import { ApiResponse, ApiSuccessResponse } from '@/types/apiTypes';

export const login = async (payload: AuthCredentialsPayload): Promise<ApiResponse<LoginResponseData>> => {
  return await api.post('/auth/login', payload);
};

export const register = (payload: RegisterTenantPayload): Promise<ApiResponse> => {
  return api.post('/auth/register', payload);
};

export const logout = (): Promise<ApiSuccessResponse> => {
  return api.post('/auth/logout');
};

export const getAuthUser = (): Promise<ApiResponse<User>> => {
  return api.get('/auth/me');
};
