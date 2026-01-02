import { useTranslation } from 'react-i18next';
import { companyInfo } from '@/config/company';
import { LoginForm } from '@/features/auth/components';

const LoginPage = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <title>{`${t('login')} - ${companyInfo.name}`}</title>
      <LoginForm />
    </>
  );
};

export default LoginPage;
