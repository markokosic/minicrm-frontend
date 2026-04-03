import { ReactNode } from 'react';
import { Avatar, Group, Stack } from '@mantine/core';

interface CustomerCardLayoutProps {
  avatar: ReactNode;
  children: ReactNode;
}

export const CustomerCardLayout = ({ avatar, children }: CustomerCardLayoutProps) => (
  <Group gap="md">
    <Avatar
      radius="xl"
      size={48}
    >
      {avatar}
    </Avatar>
    <Stack
      gap={4}
      style={{ flex: 1 }}
    >
      <Stack gap={2}>{children}</Stack>
    </Stack>
  </Group>
);
