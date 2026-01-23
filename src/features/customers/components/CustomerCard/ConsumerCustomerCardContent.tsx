import { CircleUser, Mail, Phone } from 'lucide-react';
import { Anchor, Avatar, Group, Stack, Text } from '@mantine/core';
import { ConsumerCustomer } from '../../types/customers-types';

interface ConsumerCustomerCardProps {
  customer: ConsumerCustomer;
}

export const ConsumerCustomerCardContent = ({ customer }: ConsumerCustomerCardProps) => {
  const { firstName, lastName, email, phone } = customer;

  return (
    <Group
      align="flex-start"
      gap="md"
    >
      <Avatar
        radius="xl"
        size={48}
      >
        <CircleUser size={24} />
      </Avatar>

      <Stack gap={4}>
        <Text
          fw={700}
          fz="md"
        >
          {firstName} {lastName}
        </Text>

        {/* //TRANSFORM INTO OWN COMPONENT */}
        <Stack gap={2}>
          <Group
            gap={6}
            align="center"
          >
            <Mail size={14} />
            <Anchor
              size="sm"
              href={`mailto:${email}`}
            >
              {email}
            </Anchor>
          </Group>

          <Group
            gap={6}
            align="center"
          >
            <Phone size={14} />
            <Anchor
              size="sm"
              href={`tel:${phone}`}
            >
              {phone}
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </Group>
  );
};
