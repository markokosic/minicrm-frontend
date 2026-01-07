import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Center, Stack, Text, Title } from '@mantine/core';
import { CustomTrans } from '@/components/translation/CustomTrans';
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
          <Title order={1}>{t('login.title')}</Title>
          <Text c="dimmed">{t('login.subtitle')}</Text>
        </Stack>
      </Center>
      <LoginForm />
      <div className="text-sm space-y-2 text-center pt-6">
        {/*  
          //TODO Refactor tailwind to mantine
          */}
        <p>
          <CustomTrans
            i18nKey="login.no-account-hint"
            ns="auth"
          >
            Du hast kein Konto?{' '}
            <Link
              to="/register"
              className="font-bold underline"
            >
              {t('register.link-text')}
            </Link>
          </CustomTrans>
        </p>
        <Link to="/reset-password">{t('login.forgot-password')}</Link>
      </div>
    </>
  );
};

export default LoginPage;
