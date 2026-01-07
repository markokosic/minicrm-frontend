import { Outlet } from 'react-router';
import { Center, Paper, Stack } from '@mantine/core';
import { LanguagePicker } from '@/components/ui/LanguagePicker';

const AuthLayout = () => {
  return (
    <Center
      h="100vh"
      bg="blue.0"
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
          bdrs="lg"
          bg="white"
          shadow="sm"
        >
          <Outlet />
        </Paper>

        <LanguagePicker />
      </Stack>
    </Center>
  );
};

export { AuthLayout };
