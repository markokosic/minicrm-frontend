import { TFunction } from 'i18next';
import { z } from 'zod';

const getEmailSchema = (t: TFunction) => {
  return z
    .email(t('errors:validation.email.invalid'))
    .min(1, t('errors:validation.email.required'))
    .max(254, t('errors:validation.email.too_long'));
};
const getPasswordSchema = (t: TFunction) => {
  return z
    .string()
    .min(8, t('errors:validation.password.min_length'))
    .max(72, t('errors:validation.password.max_length'));
};

const getNameSchema = (t: TFunction) => {
  return z.string().min(1, t('errors:validation.name.required')).max(100, t('errors:validation.name.too_long'));
};

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
