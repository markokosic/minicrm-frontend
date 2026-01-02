import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { CustomTrans } from '@/components/translation/CustomTrans';
import { Button } from '@/components/ui/Button';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form/Form';
// import { loginFormSchema } from '@/validation/authSchema';
import { EmailInput, PasswordInput } from '@/components/ui/Form/FormFields';
import { Link } from '@/components/ui/Link';
import { Logo } from '@/components/ui/Logo';
import { paths } from '@/config/paths';
import { FORM_FIELDS } from '@/constants/form-fields';
import { getLoginFormSchema } from '@/features/auth/schemas/auth.schema';
import { useLogin } from '@/lib/auth';

type LoginDataType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: () => {
      toast.success(t('loginSuccess') || 'Erfolgreich eingeloggt');
      navigate(paths.app.dashboard.getHref());
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : t('loginError') || 'Login fehlgeschlagen';
      toast.error(errorMessage);
    },
  });

  const methods = useForm({
    resolver: zodResolver(getLoginFormSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginDataType) => {
    try {
      await loginMutation.mutateAsync({ email: data.email, password: data.password });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast.error(`${t(error?.response?.data.errorKey)}`);
      }
    }
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
        <ControlledTextInput
          name={FORM_FIELDS.email.name}
          label={t(FORM_FIELDS.email.labelKey)}
          placeholder={t(FORM_FIELDS.email.placeholderKey)}
          type={FORM_FIELDS.email.type}
        />
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
