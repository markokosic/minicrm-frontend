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

interface CustomerBase {
  id: number;
  type: CustomerType;
  tenantId: number;
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
