import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { NavLink as $NavLink, useLocation, useNavigate } from 'react-router';
import { Avatar, Box, Divider, Group, Menu, NavLink, Stack, Text, UnstyledButton } from '@mantine/core';
import { ChevronRight, LogOut, User } from 'lucide-react';
import { NAV_ITEMS, NavItem } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const NavBar = () => {
  const location = useLocation();
  const { t } = useTranslation(['common', 'app']);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate(ROUTES.auth.login.path);
      },
      onError: (error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : t('app:auth.logout.error');
        toast.error(errorMessage);
      },
    });
  };

  const createLinks = (data: NavItem[]) =>
    data.map((item) => {
      const isActive = item.href === location.pathname;
      return (
        <NavLink
          component={$NavLink}
          key={item.id}
          to={item.path}
          label={t(item.labelKey, { ns: 'common' })}
          active={isActive}
          leftSection={<item.icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />}
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

  return (
    <Stack justify="space-between" h="100%">
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

        <Divider my="md" color="gray.2" />

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
        <Divider mb="md" color="gray.2" />
        <Menu position="top-end" shadow="md" width={220} radius="md">
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
              <Group justify="space-between">
                <Group gap="sm">
                  <Avatar color="blue" radius="xl" size="sm">
                    <User size={16} />
                  </Avatar>
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} lineClamp={1}>
                      {t('common:user')}
                    </Text>
                  </Box>
                </Group>
                <ChevronRight size={16} style={{ opacity: 0.5 }} />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{t('common:user')}</Menu.Label>
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
