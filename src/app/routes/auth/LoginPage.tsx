import { companyInfo } from '@/config/company';
import { LoginForm } from '@/modules/auth/components';

const LoginPage = () => {
  return (
    <>
      <title>{`Anmelden - ${companyInfo.name}`}</title>
      <LoginForm />
    </>
  );
};

export default LoginPage;
