import { TFunction } from 'i18next';
import { z } from 'zod';
import { getEmailSchema, getNameSchema, getPasswordSchema } from '@/common/schemas/common-schemas';

export const getLoginFormSchema = (t: TFunction) => {
  return z.object({
    email: getEmailSchema(t),
    password: getPasswordSchema(t),
  });
};

export const getRegisterFormSchema = (t: TFunction) => {
  return z
    .object({
      tenantName: getNameSchema(t),
      firstName: getNameSchema(t),
      lastName: getNameSchema(t),
      email: getEmailSchema(t),
      password: getPasswordSchema(t),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors:validation.password_mismatch'),
      path: ['confirmPassword'],
    });
};
