import { Avatar, Badge, Group, Text } from '@mantine/core';
import { ConsumerCustomer } from '../../types/customersTypes';

interface ConsumerCustomerCardProps {
  customer: ConsumerCustomer;
}

export const ConsumerCustomerCardContent = ({ customer }: ConsumerCustomerCardProps) => {
  const { firstName, lastName, email, phone } = customer;

  return (
    <Group align="center">
      <Group>
        {/* {customer.avatarUrl && <Avatar src={customer.avatarUrl} radius="xl" />} */}
        <div>
          <Text>
            {firstName} {lastName}
          </Text>
          <Text
            size="sm"
            color="dimmed"
          >
            {email}
          </Text>
        </div>
      </Group>
    </Group>
  );
};
