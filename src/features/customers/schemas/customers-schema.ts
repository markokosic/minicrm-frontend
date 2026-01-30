import { TFunction } from 'i18next';
import { z } from 'zod';
import {
  getEmailSchema,
  getNameSchema,
  getPhoneSchema,
  getVatSchema,
} from '@/common/schemas/common-schemas';
import { CustomerType } from '../types/customers-types';

export const getConsumerDataSchema = (t: TFunction) =>
  z.object({
    firstName: getNameSchema(t),
    lastName: getNameSchema(t),
    email: getEmailSchema(t),
    phone: getPhoneSchema(t),
  });

export const getBusinessDataSchema = (t: TFunction) =>
  z.object({
    companyName: getNameSchema(t),
    vat: getVatSchema(t),
    email: getEmailSchema(t),
    phone: getPhoneSchema(t),
    website: z.url(t('errors:url.invalid')).optional().or(z.literal('')),
  });

export const getCustomerSchema = (t: TFunction) =>
  z.discriminatedUnion('type', [
    getConsumerDataSchema(t).extend({
      type: z.literal(CustomerType.CONSUMER),
      id: z.number(),
      tenantId: z.number(),
    }),
    getBusinessDataSchema(t).extend({
      type: z.literal(CustomerType.BUSINESS),
      id: z.number(),
      tenantId: z.number(),
    }),
  ]);

export const getUpdateCustomerSchema = (t: TFunction) =>
  z.discriminatedUnion('type', [
    getConsumerDataSchema(t)
      .partial()
      .extend({
        type: z.literal(CustomerType.CONSUMER),
        id: z.number(),
      }),
    getBusinessDataSchema(t)
      .partial()
      .extend({
        type: z.literal(CustomerType.BUSINESS),
        id: z.number(),
      }),
  ]);

export const getAddCustomerSchema = (t: TFunction) =>
  z.discriminatedUnion('type', [
    getConsumerDataSchema(t).extend({ type: z.literal(CustomerType.CONSUMER) }),
    getBusinessDataSchema(t).extend({ type: z.literal(CustomerType.BUSINESS) }),
  ]);

// Edit Business
export const getBusinessUpdateSchema = (t: TFunction) =>
  getBusinessDataSchema(t)
    .partial()
    .extend({
      type: z.literal(CustomerType.BUSINESS),
      id: z.number(),
      tenantId: z.number(),
    });

// Edit Consumer
export const getConsumerUpdateSchema = (t: TFunction) =>
  getConsumerDataSchema(t)
    .partial()
    .extend({
      type: z.literal(CustomerType.CONSUMER),
      id: z.number(),
      tenantId: z.number(),
    });

// Add Business
export const getBusinessAddSchema = (t: TFunction) =>
  getBusinessDataSchema(t).extend({
    type: z.literal(CustomerType.BUSINESS),
  });

// Add Consumer
export const getConsumerAddSchema = (t: TFunction) =>
  getConsumerDataSchema(t).extend({
    type: z.literal(CustomerType.CONSUMER),
  });

// export type AddCustomer = z.infer<ReturnType<typeof getAddCustomerSchema>>;
// export type Customer = z.infer<ReturnType<typeof getCustomerSchema>>;
// export type UpdateCustomer = z.infer<ReturnType<typeof getUpdateCustomerSchema>>;
