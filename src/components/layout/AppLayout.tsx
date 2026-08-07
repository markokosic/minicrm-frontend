import { Outlet } from 'react-router';
import { AppShell, Box, Burger, Group, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Car } from 'lucide-react';
import { NavBar } from '@/components/ui/Navbar/Navbar';

type AppLayoutProps = {
  overlayVisible: boolean;
};

const AppLayout = ({ overlayVisible: _overlayVisible }: AppLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="lg"
      styles={{
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
          minHeight: '100vh',
        },
      }}
    >
      <AppShell.Header
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'var(--mantine-color-gray-2)',
        }}
      >
        <Group h="100%" px="lg" justify="space-between">
          <Group gap="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group gap="xs">
              <ThemeIcon size="lg" radius="md" color="blue" variant="filled">
                <Car size={20} />
              </ThemeIcon>
              <Text size="lg" fw={800} style={{ letterSpacing: '-0.02em' }}>
                Taxi<Text span color="blue.6" inherit>OS</Text>
              </Text>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          borderColor: 'var(--mantine-color-gray-2)',
          backgroundColor: '#ffffff',
        }}
      >
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export { AppLayout };
