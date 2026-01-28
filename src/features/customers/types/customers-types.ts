type Address = {
  type: number;
  name: string;
  street: string;
  zip: string;
  city: string;
  country: string;
};

export enum CustomerType {
  BUSINESS = 'BUSINESS',
  CONSUMER = 'CONSUMER',
}
export type CustomerId = number;
export type TenantId = number;

interface CustomerBase {
  id: CustomerId;
  type: CustomerType;
  tenantId: TenantId;
}

interface Consumer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Company {
  companyName: string;
  vat: string;
  email: string;
  phone: string;
  website: string;
}

export interface ConsumerCustomer extends CustomerBase, Consumer {
  type: CustomerType.CONSUMER;
}

export interface BusinessCustomer extends CustomerBase, Company {
  type: CustomerType.BUSINESS;
}

export type Customer = ConsumerCustomer | BusinessCustomer;

export type UpdateConsumerCustomer = Partial<
  Pick<ConsumerCustomer, 'firstName' | 'lastName' | 'email' | 'phone'>
>;

export type UpdateBusinessCustomer = Partial<
  Pick<BusinessCustomer, 'companyName' | 'vat' | 'email' | 'phone' | 'website'>
>;

export type UpdateCustomer = UpdateConsumerCustomer | UpdateBusinessCustomer;
