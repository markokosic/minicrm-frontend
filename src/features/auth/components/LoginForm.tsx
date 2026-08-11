import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mantine/core';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form';
import { AUTH_FORM_FIELDS } from '@/features/auth/config/auth-form-fields';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';

export const LoginForm = () => {
  const { t } = useTranslation(['common', 'app']);
  const { methods, onSubmit, isPending } = useLoginForm();

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
    >
      <Stack gap="sm">
        <ControlledTextInput
          {...AUTH_FORM_FIELDS.email}
          label={t(AUTH_FORM_FIELDS.email.labelKey)}
          placeholder={t(AUTH_FORM_FIELDS.email.placeholderKey)}
        />
        <ControlledTextInput
          {...AUTH_FORM_FIELDS.password}
          label={t(AUTH_FORM_FIELDS.password.labelKey)}
          placeholder={t(AUTH_FORM_FIELDS.password.placeholderKey)}
        />
        <Button
          type="submit"
          fullWidth
          mt="md"
          loading={isPending}
        >
          {t('app:auth.login.submit')}
        </Button>
      </Stack>
    </Form>
  );
};
