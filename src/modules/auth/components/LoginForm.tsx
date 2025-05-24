import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form';
import { Form } from '@/components/ui/Form/Form';
import { Link } from '@/components/ui/Link';
import { Logo } from '@/components/ui/Logo/Logo';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const formReturn = useForm({
    defaultValues: {
      mail: '',
    },
  });

  return (
    <div className=" bg-base-200 rounded-lg p-4">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <Form
        form={formReturn}
        onSubmit={() => null}
      >
        <Input
          type="text"
          label="E-Mail-Adresse"
          placeholder="E-Mail-Adresse eingeben"
          name="mail"
        />
        <Input
          type="password"
          label="Passwort"
          placeholder="Passwort eingeben"
          name="password"
        />

        <Button className="w-full">Anmelden</Button>
        <div className="text-sm space-y-2 text-center pt-4">
          <p>
            Du hast kein Konto?{' '}
            <Link
              className="font-bold underline"
              to="/reset-password"
            >
              Jetzt registrieren
            </Link>
          </p>
          <Link
            className=""
            to="/reset-password"
          >
            Passwort vergessen?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export { LoginForm };
