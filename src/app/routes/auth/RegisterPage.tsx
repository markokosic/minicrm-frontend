import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Center, Stack, Text, Title } from '@mantine/core';
import { Button } from '@/components/ui/Button';
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

      <Center pt="xl">
        <Stack
          align="center"
          w="100%"
        >
          <Text c="dimmed">{t('account.existingAccount')}</Text>
          <Button
            fullWidth
            variant="outline"
          >
            <Link to={paths.auth.login.path}>{t('login.title')}</Link>
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default RegisterPage;
