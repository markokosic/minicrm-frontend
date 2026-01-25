import { TFunction } from 'i18next';
import { z } from 'zod';
import { getEmailSchema, getNameSchema, getPhoneSchema } from '@/common/schemas/common-schemas';
import { CustomerType } from '../types/customers-types';

export const getVatSchema = (t: TFunction) => {
  return z
    .string()
    .min(1, t('errors:validation.vat.required'))
    .max(20, t('errors:validation.vat.too_long'))
    .regex(/^[A-Z0-9]+$/, t('errors:validation.vat.invalid_format'));
};

export const getBaseCustomerSchema = () => {
  return z.object({
    id: z.number(),
    type: z.enum(CustomerType),
    tenantId: z.number(),
  });
};

export const getBusinessCustomerSchema = (t: TFunction) => {
  return getBaseCustomerSchema().extend({
    type: z.literal(CustomerType.BUSINESS),
    companyName: getNameSchema(t),
    vat: getVatSchema(t),
    email: getEmailSchema(t),
    phone: getPhoneSchema(t),
  });
};

export const getConsumerCustomerSchema = (t: TFunction) => {
  return getBaseCustomerSchema().extend({
    type: z.literal(CustomerType.CONSUMER),
    firstName: getNameSchema(t),
    lastName: getNameSchema(t),
    email: getEmailSchema(t),
    phone: getPhoneSchema(t),
  });
};
