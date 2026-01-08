import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form';
import { routes } from '@/config/routes';
import { FORM_FIELDS } from '@/constants/form-fields';
import { getLoginFormSchema } from '@/features/auth/schemas/auth.schema';
import { useLogin } from '@/lib/auth';

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: () => {
      toast.success(t('login.success'));
      navigate(routes.app.dashboard.getHref());
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data?.errorKey) {
        toast.error(`${t(`errors.${error?.response?.data.errorKey}`)}`);
      }
    },
  });

  const methods = useForm({
    resolver: zodResolver(getLoginFormSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  const fields = [FORM_FIELDS.email, FORM_FIELDS.password];

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
        />
      ))}
      <Button
        type="submit"
        fullWidth
        mt="xs"
      >
        {t('login.submit')}
      </Button>
    </Form>
  );
};
