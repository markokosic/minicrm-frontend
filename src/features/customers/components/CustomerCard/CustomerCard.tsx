import { Card, Text } from '@mantine/core';
import {
  BusinessCustomer,
  ConsumerCustomer,
  Customer,
  CustomerType,
} from '../../types/customersTypes';
import { BusinessCustomerCardContent } from './BusinessCustomerCardContent';
import { ConsumerCustomerCardContent } from './ConsumerCustomerCardContent';

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  const contentMap = {
    [CustomerType.CONSUMER]: (
      <ConsumerCustomerCardContent customer={customer as ConsumerCustomer} />
    ),
    [CustomerType.BUSINESS]: (
      <BusinessCustomerCardContent customer={customer as BusinessCustomer} />
    ),
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      miw={300}
      mih={100}
    >
      {contentMap[customer.type] || <Text color="red">ERROR: Unknown customer type</Text>}
    </Card>
  );
};
