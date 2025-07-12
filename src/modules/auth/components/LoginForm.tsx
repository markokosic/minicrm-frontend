import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form/Form';
import { Link } from '@/components/ui/Link';
import { Logo } from '@/components/ui/Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/validation/authSchema';
import { EmailInput, PasswordInput } from '@/components/ui/Form/FormFields';
import { useLogin } from '@/lib/auth';
import { useNavigate } from 'react-router';
import { paths } from '@/config/paths';
import { Trans, useTranslation } from 'react-i18next';
import { CustomTrans } from '@/components/translation/CustomTrans';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
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
          {t('login')}
        </Button>
        <div className="text-sm space-y-2 text-center pt-6">
          <p>
            <CustomTrans
              i18nKey="noAccount"
              ns="auth"
            >
              Du hast kein Konto?{' '}
              <Link
                to="/register"
                className="font-bold underline"
              >
                Jetzt registrieren
              </Link>
            </CustomTrans>
          </p>
          <Link to="/reset-password">{t('forgotPassword')}</Link>
        </div>
      </Form>
    </div>
  );
};
