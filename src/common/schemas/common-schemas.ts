import { TFunction } from 'i18next';
import { z } from 'zod';

export const getNameSchema = (t: TFunction) => {
  return z
    .string()
    .min(1, t('errors:validation.name.required'))
    .max(100, t('errors:validation.name.too_long'));
};

export const getEmailSchema = (t: TFunction) => {
  return z
    .email(t('errors:validation.email.invalid'))
    .min(1, t('errors:validation.email.required'))
    .max(254, t('errors:validation.email.too_long'));
};

export const getPasswordSchema = (t: TFunction) => {
  return z
    .string()
    .min(8, t('errors:validation.password.min_length'))
    .max(72, t('errors:validation.password.max_length'));
};

export const getPhoneSchema = (t: TFunction) => {
  return z
    .string()
    .min(1, t('errors:phone.required'))
    .max(20, t('errors:phone.too_long'))
    .regex(/^\+?[0-9\s\-()]+$/, t('errors:phone.invalid_format'));
};
