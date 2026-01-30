import {
  AddBusinessCustomer,
  AddConsumerCustomer,
  BusinessData,
  ConsumerData,
  CustomerType,
  UpdateBusinessCustomer,
  UpdateConsumerCustomer,
} from '../types/customers-types';

export const mapBusinessCustomerToUpdateDTO = (
  customer: UpdateBusinessCustomer
): Partial<BusinessData> => ({
  companyName: customer.companyName,
  vat: customer.vat,
  email: customer.email,
  phone: customer.phone,
  website: customer.website,
});

export const mapConsumerCustomerToUpdateDTO = (
  customer: UpdateConsumerCustomer
): Partial<ConsumerData> => ({
  firstName: customer.firstName,
  lastName: customer.lastName,
  email: customer.email,
  phone: customer.phone,
});

export const mapConsumerCustomerToAddDTO = (
  customer: ConsumerData,
  type: CustomerType.CONSUMER
): AddConsumerCustomer => ({
  ...customer,
  type,
});

export const mapBusinessCustomerToAddDTO = (
  customer: BusinessData,
  type: CustomerType.BUSINESS
): AddBusinessCustomer => ({
  ...customer,
  type,
});
