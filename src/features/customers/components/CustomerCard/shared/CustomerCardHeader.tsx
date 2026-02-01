import { ReactNode } from 'react';
import { Avatar, Group, Stack, Text } from '@mantine/core';

interface CustomerCardHeaderProps {
  avatar?: ReactNode;
  title: string;
}

export const CustomerCardHeader = ({ avatar, title }: CustomerCardHeaderProps) => (
  <Group>
    {avatar && (
      <Avatar
        radius="xl"
        size={48}
      >
        {avatar}
      </Avatar>
    )}

    <Stack>
      <Text fw={700}>{title}</Text>
    </Stack>
  </Group>
);
