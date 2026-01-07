import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Center, Stack, Text, Title } from '@mantine/core';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

const RegisterPage = () => {
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
          <Title order={1}>{t('register.title')}</Title>
          <Text c="dimmed">{t('register.submit')}</Text>
        </Stack>
      </Center>
      <RegisterForm />
      <div className="text-sm space-y-2 text-center pt-6">
        <Link to={paths.auth.login.path}>{t('login.back-to-login')}</Link>
      </div>
    </>
  );
};

export default RegisterPage;
