import { ChevronRight, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { NavLink as $NavLink, useLocation, useNavigate } from 'react-router';
import {
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { NAV_ITEMS, NavItem } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/features/auth';

export const NavBar = () => {
  const location = useLocation();
  const { t } = useTranslation(['common', 'app']);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate(ROUTES.auth.login.path);
      },
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : t('app:auth.logout.error');
        toast.error(errorMessage);
      },
    });
  };

  const isNavActive = (itemHref: string, currentPath: string) => {
    if (itemHref === '/' || itemHref === '') {
      return currentPath === itemHref;
    }
    return currentPath === itemHref || currentPath.startsWith(`${itemHref}/`);
  };

  const createLinks = (data: NavItem[]) =>
    data.map((item) => {
      const isActive = isNavActive(item.href, location.pathname);
      return (
        <NavLink
          component={$NavLink}
          key={item.id}
          to={item.path}
          label={t(item.labelKey, { ns: 'common' })}
          active={isActive}
          leftSection={
            <item.icon
              size={18}
              strokeWidth={isActive ? 2.2 : 1.7}
            />
          }
          styles={{
            root: {
              borderRadius: 'var(--mantine-radius-md)',
              margin: '3px 0',
              padding: '10px 14px',
              transition: 'all 150ms ease',
              backgroundColor: isActive ? 'var(--mantine-color-blue-light)' : 'transparent',
              color: isActive ? 'var(--mantine-color-blue-filled)' : undefined,
              fontWeight: isActive ? 600 : 500,
              '&:hover': {
                backgroundColor: isActive
                  ? 'var(--mantine-color-blue-light-hover)'
                  : 'var(--mantine-color-gray-0)',
                transform: 'translateX(2px)',
              },
            },
          }}
        />
      );
    });

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ''}`.trim()
    : user?.email ?? t('common:user');

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user?.firstName
        ? user.firstName[0].toUpperCase()
        : null;

  return (
    <Stack
      justify="space-between"
      h="100%"
    >
      <Box>
        <Box mb="md">
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            c="dimmed"
            style={{ letterSpacing: '0.06em' }}
            px="xs"
            mb="xs"
          >
            {t('common:general')}
          </Text>
          {createLinks(NAV_ITEMS.general)}
        </Box>

        <Divider
          my="md"
          color="gray.2"
        />

        <Box>
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            c="dimmed"
            style={{ letterSpacing: '0.06em' }}
            px="xs"
            mb="xs"
          >
            {t('common:support')}
          </Text>
          {createLinks(NAV_ITEMS.support)}
        </Box>
      </Box>

      <Box pt="sm">
        <Divider
          mb="md"
          color="gray.2"
        />
        <Menu
          position="top-end"
          shadow="md"
          width={240}
          radius="md"
        >
          <Menu.Target>
            <UnstyledButton
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--mantine-radius-md)',
                transition: 'background-color 150ms ease',
              }}
              className="user-menu-btn"
            >
              <Group justify="space-between" wrap="nowrap">
                <Group gap="sm" wrap="nowrap" style={{ overflow: 'hidden' }}>
                  <Avatar
                    color="blue"
                    radius="xl"
                    size="sm"
                  >
                    {initials ?? <User size={16} />}
                  </Avatar>
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      size="sm"
                      fw={600}
                      truncate="end"
                    >
                      {displayName}
                    </Text>
                    {user?.email && (
                      <Text
                        size="xs"
                        c="dimmed"
                        truncate="end"
                      >
                        {user.email}
                      </Text>
                    )}
                  </Box>
                </Group>
                <ChevronRight
                  size={16}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{displayName}</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={<LogOut size={16} />}
              onClick={handleLogout}
            >
              {t('app:auth.logout.title')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Stack>
  );
};
