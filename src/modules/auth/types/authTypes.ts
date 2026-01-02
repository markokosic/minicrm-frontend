import { ApiResponse } from '@/types/apiTypes';
import { loginFormSchema, getRegisterFormSchema } from '@/validation/authSchema';
import z from 'zod';

export type LoginResponseData = {
  user: User;
};

export type AuthCredentialsPayload = z.infer<typeof loginFormSchema>;

export type RegisterTenantPayload = z.infer<typeof getRegisterFormSchema>;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tenantId: number;
};
