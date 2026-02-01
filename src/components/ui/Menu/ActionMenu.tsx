import { EllipsisVertical, LucideIcon } from 'lucide-react';
import { Button, Menu, MenuItemProps, MenuProps } from '@mantine/core';

interface Action extends MenuItemProps {
  label: string;
  icon: LucideIcon;
}

interface ActionMenuProps extends MenuProps {
  actions: Action[];
  isRound?: boolean;
}

export const ActionMenu = ({ actions, isRound, ...props }: ActionMenuProps) => {
  return (
    <Menu
      shadow="md"
      width={200}
      {...props}
    >
      <Menu.Target>
        <Button
          radius="100%"
          size="lg"
          styles={{
            root: {
              width: 48,
              height: 48,
              padding: 0,
            },
          }}
          variant="light"
        >
          <EllipsisVertical />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {actions.map((action) => {
          return (
            <Menu.Item
              key={action.label}
              leftSection={<action.icon size={14} />}
              {...action}
            >
              {action.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
