import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form/Form';
import { Link } from '@/components/ui/Link';
import { Logo } from '@/components/ui/Logo/Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/validation/authSchema';
import { EmailInput, PasswordInput } from '@/components/ui/Form/FormFields';
import { useAuth } from '@/modules/auth/hooks/useAuth';

const LoginForm = () => {
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: any) => {
    console.log(data);
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

export { LoginForm };
