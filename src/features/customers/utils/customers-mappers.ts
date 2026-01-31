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
  ...customer,
});

export const mapConsumerCustomerToUpdateDTO = (
  customer: UpdateConsumerCustomer
): Partial<ConsumerData> => ({
  ...customer,
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
