import { ActionIcon } from '@mantine/core';

type FloatingActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const FloatingActionButton = ({ onClick, children }: FloatingActionButtonProps) => {
  return (
    <ActionIcon
      size="xl"
      radius="xl"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
      onClick={onClick}
    >
      {children}
    </ActionIcon>
  );
};
