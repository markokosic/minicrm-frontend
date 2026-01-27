import { Box, Center, Text } from '@mantine/core';
import {
  BusinessCustomer,
  ConsumerCustomer,
  Customer,
  CustomerType,
} from '../../types/customers-types';
import { BusinessCustomerFormContent } from './BusinessCustomerFormContent copy';
import { ConsumerCustomerFormContent } from './ConsumerCustomerFormContent';

interface CustomerFormProps {
  customer: Customer;
  isReadOnly: boolean;
}

export const CustomerForm = ({ customer, isReadOnly }: CustomerFormProps) => {
  const contentMap = {
    [CustomerType.BUSINESS]: (
      <BusinessCustomerFormContent
        customer={customer as BusinessCustomer}
        isReadOnly={isReadOnly}
      />
    ),
    [CustomerType.CONSUMER]: (
      <ConsumerCustomerFormContent
        customer={customer as ConsumerCustomer}
        isReadOnly={isReadOnly}
      />
    ),
  };

  return <Box>{contentMap[customer.type] || <Text>ERROR: Unknown Customer type</Text>}</Box>;
};
