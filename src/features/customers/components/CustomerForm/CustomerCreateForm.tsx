import { FieldValues, Resolver, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mantine/core';
import { Form } from '@/components/ui/Form';
import { ROUTES } from '@/config/routes';
import { AddCustomerFormConfig } from '../../config/customers-form-config';
import { useAddCustomer } from '../../hooks/useAddCustomer';
import { CustomerType } from '../../types/customers-types';

interface CustomerCreateFormProps<T extends FieldValues> {
  config: AddCustomerFormConfig<T, any, any>;
  type: CustomerType;
}

export const CustomerCreateForm = <T extends FieldValues>({
  config,
  type,
}: CustomerCreateFormProps<T>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useAddCustomer({});

  const methods = useForm<T>({
    resolver: config.getResolver(t) as Resolver<T>,
    defaultValues: config.getDefaultValues() as any,
  });

  const onSubmit = (data: T) => {
    const mappedData = config.mapper(data, type);
    mutate(
      { data: mappedData as any },
      {
        onSuccess: (response) => {
          const newId = response?.id;
          navigate(ROUTES.app.customers.view.getHref(newId));
          toast.success(t('customers:notifications.create.success'));
        },
      }
    );
  };

  return (
    <Box>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        formFields={config.getFields()}
        formActions={
          <>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              {t('common:actions.cancel')}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={!methods.formState.isDirty || isPending}
            >
              {t('customers:actions.add_customer')}
            </Button>
          </>
        }
      />
    </Box>
  );
};
