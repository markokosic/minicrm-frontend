import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Form } from '@/components/ui/Form/Form';
import {
  ConfirmPasswordInput,
  EmailInput,
  FirstNameInput,
  LastNameInput,
  PasswordInput,
  TenantNameInput,
} from '@/components/ui/Form/FormFields';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/OldButton';
import { paths } from '@/config/paths';
import { getRegisterFormSchema } from '@/features/auth/schemas/auth.schema';

type Props = {
  onSubmit: (values: any) => Promise<void> | void;
};

export const RegisterForm = ({ onSubmit }: Props) => {
  const { t } = useTranslation();

  const schema = getRegisterFormSchema(t);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tenantName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  return (
    <div className=" bg-base-200 shadow rounded-lg px-6 py-12  max-w-lg w-full">
      <div className="flex items-center justify-center mb-6">
        <Logo />
      </div>
      <Form
        methods={methods}
        onSubmit={onSubmit}
      >
        <TenantNameInput />
        <FirstNameInput />
        <LastNameInput />
        <EmailInput />
        <PasswordInput />
        <ConfirmPasswordInput />
        <Button
          type="submit"
          className="w-full mt-6 "
        >
          {t('auth:register')}
        </Button>

        <div className="text-sm space-y-2 text-center pt-6">
          <Link to={paths.auth.login.path}>{t('auth:backToLogin')}</Link>
        </div>
      </Form>
    </div>
  );
};
