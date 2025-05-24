import { AuthLayout } from '@/components/layout/AuthLayout';
import { companyInfo } from '@/config/company';
import { LoginForm } from '@/modules/auth/components/LoginForm';

const Login = () => {
  return (
    <AuthLayout title={`Anmelden - ${companyInfo.name}`}>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
