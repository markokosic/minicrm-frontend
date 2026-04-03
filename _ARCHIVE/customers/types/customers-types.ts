export enum CustomerType {
  BUSINESS = 'BUSINESS',
  CONSUMER = 'CONSUMER',
}
export type CustomerId = number;
export type TenantId = number;

interface MetaData {
  id: CustomerId;
  tenantId: TenantId;
}

export interface ConsumerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BusinessData {
  companyName: string;
  vat: string;
  email: string;
  phone: string;
  website: string;
}

export interface ConsumerCustomer extends MetaData, ConsumerData {
  type: CustomerType.CONSUMER;
}

export interface BusinessCustomer extends MetaData, BusinessData {
  type: CustomerType.BUSINESS;
}

export type Customer = AddCustomer & MetaData;

//UPDATE

export type UpdateConsumerCustomer = Partial<ConsumerData> &
  MetaData & {
    type: CustomerType.CONSUMER;
  };

export type UpdateBusinessCustomer = Partial<BusinessData> &
  MetaData & {
    type: CustomerType.BUSINESS;
  };

export type UpdateCustomer = UpdateConsumerCustomer | UpdateBusinessCustomer;

//ADD

export type AddConsumerCustomer = ConsumerData & { type: CustomerType.CONSUMER };
export type AddBusinessCustomer = BusinessData & { type: CustomerType.BUSINESS };

export type AddCustomer = AddConsumerCustomer | AddBusinessCustomer;
