import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form';
import { ROUTES } from '@/config/routes';
import { getRegisterFormSchema } from '@/features/auth/schemas/auth-schema';
import { useRegister } from '@/lib/auth';
import { AUTH_FORM_FIELDS } from '../config/auth-form-fields';

type FormValues = {
  tenantName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const { t } = useTranslation(['auth', 'errors']);
  const navigate = useNavigate();
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

  const registerMutation = useRegister({
    onSuccess: () => {
      navigate(ROUTES.auth.login.path);
      toast.success(t('auth:register.success'));
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data?.errorKey) {
        toast.error(t(error?.response?.data.errorKey, { ns: 'errors' }));
      }
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    registerMutation.mutate({
      tenantName: data.tenantName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  const fields = [
    AUTH_FORM_FIELDS.tenantName,
    AUTH_FORM_FIELDS.firstName,
    AUTH_FORM_FIELDS.lastName,
    AUTH_FORM_FIELDS.email,
    AUTH_FORM_FIELDS.password,
    AUTH_FORM_FIELDS.confirmPassword,
  ];

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
    >
      {fields.map((field) => (
        <ControlledTextInput
          key={field.name}
          name={field.name}
          type={field.type}
          label={t(field.labelKey)}
          placeholder={t(field.placeholderKey)}
          withAsterisk
        />
      ))}
      <Button
        mt="xs"
        type="submit"
        fullWidth
      >
        {t('register.submit')}
      </Button>
    </Form>
  );
};
