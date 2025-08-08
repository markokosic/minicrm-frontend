type Address = {
  type: number;
  name: string;
  street: string;
  zip: string;
  city: string;
  country: string;
};

type CustomerBase<T> = {
  customerTypeId: number;
  customer: T;
  addresses: Address[];
};

type PrivateCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type CompanyCustomer = {
  name: string;
  vat: string;
  email: string;
  phone: string;
  website: string;
};

export type PersonData = CustomerBase<PrivateCustomer>;

export type CompanyData = CustomerBase<CompanyCustomer>;
