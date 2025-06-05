import { ApiResponse } from '@/types/apiTypes';

export type LoginResponseData = {
  user: User;
};

export type LoginResponse = ApiResponse<LoginResponseData>;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tenantId: number;
};
