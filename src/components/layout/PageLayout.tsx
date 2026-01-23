import { ReactNode } from 'react';
import { Title } from '@mantine/core';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <>
      <Title order={1}>{title}</Title>
      {children}
    </>
  );
};
