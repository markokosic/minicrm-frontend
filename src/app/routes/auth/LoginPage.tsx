import { useTranslation } from 'react-i18next';
import { Center, Stack, Text, Title } from '@mantine/core';
import { LoginForm } from '@/features/auth/components';

const LoginPage = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <Center
        pb="xl"
        pt="xl"
      >
        <Stack
          align="center"
          gap="xs"
        >
          <Title order={1}>{t('login')}</Title>
          <Text c="dimmed">{t('please-login-to-continue')}</Text>
        </Stack>
      </Center>
      <LoginForm />
    </>
  );
};

export default LoginPage;
