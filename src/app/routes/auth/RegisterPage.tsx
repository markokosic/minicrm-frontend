import { RegisterForm } from '@/features/auth/components/RegisterForm';

const RegisterPage = () => {
  const handleRegister = () => {};

  return (
    <>
      <RegisterForm onSubmit={handleRegister} />
    </>
  );
};

export default RegisterPage;
