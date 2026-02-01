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
): Partial<BusinessData> => {
  const { id, tenantId, type, ...businessData } = customer;
  return businessData;
};

export const mapConsumerCustomerToUpdateDTO = (
  customer: UpdateConsumerCustomer
): Partial<ConsumerData> => {
  const { id, tenantId, type, ...customerData } = customer;
  return customerData;
};

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
