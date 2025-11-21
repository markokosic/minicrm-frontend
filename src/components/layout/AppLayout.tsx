import { Outlet } from 'react-router';

import { AppShell, Burger, Group, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Logo } from '../ui/Logo';
import Navbar from '../ui/Navbar/Navbar';

type AppLayoutProps = {
  overlayVisible: boolean;
};

const AppLayout = ({ overlayVisible }: AppLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  // const user = useUser();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Logo />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <LoadingOverlay
          visible={overlayVisible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'blue', type: 'bars' }}
        />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export { AppLayout };
