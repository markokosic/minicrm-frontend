import { ReactNode } from 'react';
import { Anchor, Group } from '@mantine/core';

interface ContactRowProps {
  icon: ReactNode;
  href: string;
  children: ReactNode;
}

{
  /* //TODO refactor CustomerCardRow if more types of row are needed, currently only Anchor is supported */
}

export const CustomerCardRow = ({ icon, href, children }: ContactRowProps) => (
  <Group gap="xs">
    {icon}
    <Anchor
      size="sm"
      href={href}
    >
      {children}
    </Anchor>
  </Group>
);
