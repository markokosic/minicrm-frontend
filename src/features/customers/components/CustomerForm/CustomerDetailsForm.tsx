import { Customer, CustomerType } from '../../types/customers-types';
import { BusinessCustomerDetailsForm } from './BusinessCustomerDetailsForm';
import { ConsumerCustomerDetailsForm } from './ConsumerCustomerDetailsForm';

interface Props {
  customer: Customer;
  isReadOnly: boolean;
}

export const CustomerDetailsForm = ({ customer, isReadOnly }: Props) => {
  if (customer.type === CustomerType.BUSINESS) {
    return (
      <BusinessCustomerDetailsForm
        customer={customer}
        isReadOnly={isReadOnly}
      />
    );
  }

  return (
    <ConsumerCustomerDetailsForm
      customer={customer}
      isReadOnly={isReadOnly}
    />
  );
};
