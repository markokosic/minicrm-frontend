import { Building2 } from 'lucide-react';
import { Avatar, Badge, Group, Text } from '@mantine/core';
import { BusinessCustomer } from '../../types/customers-types';

interface BusinessCustomerCardProps {
  customer: BusinessCustomer;
}

export const BusinessCustomerCardContent = ({ customer }: BusinessCustomerCardProps) => {
  const { companyName, email, phone } = customer;
  return (
    <Group align="center">
      <Group>
        <Avatar radius="xl">
          <Building2 />
        </Avatar>

        <div>
          <Text fw={700}>{companyName}</Text>
          <Text size="sm">{email}</Text>
          <Text size="sm">{phone}</Text>
        </div>
      </Group>
    </Group>
  );
};
