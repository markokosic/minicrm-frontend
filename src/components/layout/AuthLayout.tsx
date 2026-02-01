import { Outlet } from 'react-router';
import { Center, Paper, Stack } from '@mantine/core';
import { LanguagePicker } from '@/components/ui/LanguagePicker';

const AuthLayout = () => {
  return (
    <Center
      mih="100vh"
      bg="var(--mantine-primary-color-1)"
      p="md"
    >
      <Stack
        align="center"
        gap="md"
        w="100%"
        maw={600}
      >
        <Paper
          w="100%"
          p="xl"
        >
          <Outlet />
        </Paper>

        <LanguagePicker />
      </Stack>
    </Center>
  );
};

export { AuthLayout };
