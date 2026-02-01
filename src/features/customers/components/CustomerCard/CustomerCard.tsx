import { Card, Text } from '@mantine/core';
import { Customer, CustomerType } from '../../types/customers-types';
import { BusinessCustomerCardContent } from './BusinessCustomerCardContent';
import { ConsumerCustomerCardContent } from './ConsumerCustomerCardContent';

interface CustomerCardProps {
  customer: Customer;
}

//TODO Transform into Compound Component?

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  let content: React.ReactNode;

  switch (customer.type) {
    case CustomerType.CONSUMER:
      content = <ConsumerCustomerCardContent customer={customer} />;
      break;

    case CustomerType.BUSINESS:
      content = <BusinessCustomerCardContent customer={customer} />;
      break;

    default:
      content = <Text c="red">ERROR: Unknown customer type</Text>;
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      miw={300}
      mih={100}
    >
      {content}
    </Card>
  );
};
