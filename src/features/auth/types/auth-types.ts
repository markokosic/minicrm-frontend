import z from 'zod';
import { getLoginFormSchema, getRegisterFormSchema } from '@/features/auth/schemas/auth-schema';

export type LoginResponseData = {
  user: User;
};

export type AuthCredentialsPayload = z.infer<typeof getLoginFormSchema>;

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
