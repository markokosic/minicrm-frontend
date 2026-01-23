import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { NavLink as $NavLink, useLocation, useNavigate } from 'react-router';
import { Box, Button, Divider, Menu, NavLink, Text } from '@mantine/core';
import { NAV_ITEMS, NavItem } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { useLogout } from '@/lib/auth';

export const NavBar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const logoutMutation = useLogout({
    onSuccess: () => {
      navigate(ROUTES.auth.login.path);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : t('loginError') || 'Logout fehlgeschlagen';
      toast.error(errorMessage);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined);
  };

  const createLinks = (data: NavItem[]) =>
    data.map((item) => {
      return (
        <>
          <NavLink
            component={$NavLink}
            key={item.id}
            to={item.path}
            label={t(item.labelKey, { ns: 'common' })}
            active={item.href === location.pathname}
            leftSection={<item.icon size={16} />}
          />
        </>
      );
    });

  return (
    <>
      <Box>
        <Text
          size="xs"
          tt="uppercase"
          c="dimmed"
        >
          General
        </Text>
        {createLinks(NAV_ITEMS.general)}
      </Box>
      <Divider my="md" />

      <Box>
        <Text
          size="xs"
          tt="uppercase"
          c="dimmed"
        >
          Support
        </Text>
        {createLinks(NAV_ITEMS.support)}
      </Box>
      <Menu>
        <Menu.Target>
          <Button>User</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={handleLogout}>{t('logout.title', { ns: 'auth' })}</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
