import {
  BusinessCustomer,
  ConsumerCustomer,
  UpdateBusinessCustomer,
  UpdateConsumerCustomer,
} from '../types/customers-types';

export const mapBusinessCustomerToUpdateDTO = (
  customer: BusinessCustomer
): UpdateBusinessCustomer => ({
  companyName: customer.companyName,
  vat: customer.vat,
  email: customer.email,
  phone: customer.phone,
  website: customer.website,
});

export const mapConsumerCustomerToUpdateDTO = (
  customer: ConsumerCustomer
): UpdateConsumerCustomer => ({
  firstName: customer.firstName,
  lastName: customer.lastName,
  email: customer.email,
  phone: customer.phone,
});
