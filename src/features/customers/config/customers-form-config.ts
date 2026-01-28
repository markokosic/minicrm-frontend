import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { Resolver } from 'react-hook-form';
import { getBusinessCustomerSchema, getConsumerCustomerSchema } from '../schemas/customers-schema';
import {
  BusinessCustomer,
  ConsumerCustomer,
  Customer,
  CustomerType,
  UpdateCustomer,
} from '../types/customers-types';
import {
  mapBusinessCustomerToUpdateDTO,
  mapConsumerCustomerToUpdateDTO,
} from '../utils/customers-mappers';
import { CUSTOMER_FORM_FIELDS } from './customers-form-fields';

export interface CustomerFormConfig<T extends Customer> {
  getResolver: (t: TFunction) => Resolver<T>;
  getFields: (args: { isReadOnly: boolean; role?: string }) => any[];
  mapper: (data: any) => UpdateCustomer;
  getDefaultValues: (customer: T) => T;
}

export type CustomerFormConfigMap = {
  [CustomerType.BUSINESS]: CustomerFormConfig<BusinessCustomer>;
  [CustomerType.CONSUMER]: CustomerFormConfig<ConsumerCustomer>;
};

export const CUSTOMER_FORM_CONFIG: CustomerFormConfigMap = {
  [CustomerType.BUSINESS]: {
    getResolver: (t) => zodResolver(getBusinessCustomerSchema(t)),
    getFields: ({ isReadOnly }) => [
      {
        groupName: 'form:groups.general_information',
        layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
        fields: [
          { ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].companyName, isDisabled: isReadOnly },
          { ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].vat, isDisabled: isReadOnly },
        ],
      },
      {
        groupName: 'form:groups.contact',
        layout: { desktop: { columns: 3 }, mobile: { columns: 1 } },
        fields: [
          { ...CUSTOMER_FORM_FIELDS.common.email, isDisabled: isReadOnly },
          { ...CUSTOMER_FORM_FIELDS.common.phone, isDisabled: isReadOnly },
          { ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].website, isDisabled: isReadOnly },
        ],
      },
    ],
    mapper: mapBusinessCustomerToUpdateDTO,
    getDefaultValues: (customer: BusinessCustomer) => ({
      id: customer.id,
      type: customer.type,
      tenantId: customer.tenantId,
      companyName: customer.companyName,
      vat: customer.vat,
      email: customer.email,
      website: customer.website,
      phone: customer.phone,
    }),
  },
  [CustomerType.CONSUMER]: {
    getResolver: (t) => zodResolver(getConsumerCustomerSchema(t)),
    getFields: ({ isReadOnly }) => [
      {
        groupName: 'form:groups.general_information',
        layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
        fields: [
          { ...CUSTOMER_FORM_FIELDS[CustomerType.CONSUMER].firstName, isDisabled: isReadOnly },
          { ...CUSTOMER_FORM_FIELDS[CustomerType.CONSUMER].lastName, isDisabled: isReadOnly },
        ],
      },
      {
        groupName: 'form:groups.contact',
        layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
        fields: [
          { ...CUSTOMER_FORM_FIELDS.common.email, isDisabled: isReadOnly },
          { ...CUSTOMER_FORM_FIELDS.common.phone, isDisabled: isReadOnly },
        ],
      },
    ],
    mapper: mapConsumerCustomerToUpdateDTO,
    getDefaultValues: (customer: ConsumerCustomer) => ({
      id: customer.id,
      type: customer.type,
      tenantId: customer.tenantId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
    }),
  },
};
