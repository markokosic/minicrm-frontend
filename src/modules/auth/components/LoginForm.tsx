import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form/Form';
import { Link } from '@/components/ui/Link';
import { Logo } from '@/components/ui/Logo/Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/validation/authSchema';
import { EmailInput, PasswordInput } from '@/components/ui/Form/FormFields';
import { useLogin } from '@/lib/auth';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';

export const LoginForm = () => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: loginMutate, isLoading, isSuccess } = useLogin();

  const handleSubmit = async (data: any) => {
    console.log(isSuccess);
    await loginMutate({ email: 'john@doe2.com', password: 'Test1234' });
    navigate(paths.app.dashboard.getHref());
  };

  return (
    <div className=" bg-base-200 shadow rounded-lg px-6 py-12  max-w-lg w-full">
      <div className="flex items-center justify-center mb-6">
        <Logo />
      </div>
      <Form
        methods={methods}
        onSubmit={handleSubmit}
      >
        <EmailInput />
        <PasswordInput />

        <Button
          type="submit"
          className="w-full mt-6 "
        >
          Anmelden
        </Button>
        <div className="text-sm space-y-2 text-center pt-6">
          <p>
            Du hast kein Konto?{' '}
            <Link
              className="font-bold underline"
              to="/reset-password"
            >
              Jetzt registrieren
            </Link>
          </p>
          <Link to="/reset-password">Passwort vergessen?</Link>
        </div>
      </Form>
    </div>
  );
};
