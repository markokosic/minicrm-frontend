import { companyInfo } from '@/config/company';
import { LoginForm } from '@/modules/auth/components';
import { useTranslation } from 'react-i18next';

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
