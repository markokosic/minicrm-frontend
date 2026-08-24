import { RegisterMutationBody } from '@/api/generated/endpoints/authentication/authentication';

export interface RegisterFormFields {
  tenantName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const mapRegisterFormToMutationBody = (
  data: RegisterFormFields
): RegisterMutationBody => ({
  tenantName: data.tenantName,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  password: data.password,
});
