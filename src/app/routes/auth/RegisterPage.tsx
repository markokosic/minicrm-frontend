import { RegisterForm } from '@/modules/auth/components/RegisterForm';

const RegisterPage = () => {
  const handleRegister = () => {};

  return (
    <>
      <RegisterForm onSubmit={handleRegister} />
    </>
  );
};

export default RegisterPage;
