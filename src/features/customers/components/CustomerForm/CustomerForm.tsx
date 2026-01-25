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
}

export const CustomerForm = ({ customer }: CustomerFormProps) => {
  const contentMap = {
    [CustomerType.BUSINESS]: (
      <BusinessCustomerFormContent customer={customer as BusinessCustomer} />
    ),
    [CustomerType.CONSUMER]: (
      <ConsumerCustomerFormContent customer={customer as ConsumerCustomer} />
    ),
  };

  return <Box>{contentMap[customer.type] || <Text>ERROR: Unknown Customer type</Text>}</Box>;
};
