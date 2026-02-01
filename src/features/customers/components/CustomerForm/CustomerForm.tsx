import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mantine/core';
import { Form } from '@/components/ui/Form';
import { ROUTES } from '@/config/routes';
import { CustomerFormConfig } from '../../config/customers-form-config';
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer';
import { CustomerId } from '../../types/customers-types';

interface BaseProps<T extends FieldValues> {
  customer: T & { id: CustomerId };
  isEditMode: boolean;
  config: CustomerFormConfig<T>;
}

export const CustomerForm = <T extends FieldValues>({
  customer,
  isEditMode,
  config,
}: BaseProps<T>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateCustomer({});

  const formOptions: UseFormProps<T> = {
    resolver: config.getResolver(t),
    defaultValues: config.getDefaultValues(customer) as any,
  };

  const methods = useForm<T>(formOptions);

  const onSubmit = (data: T) => {
    const mappedData = config.mapper(data);

    mutate(
      { id: customer.id, data: mappedData },
      {
        onSuccess: () => {
          navigate(ROUTES.app.customers.view.getHref(customer.id));
          toast.success(t('customers:notifications.edit.success'));
        },
      }
    );
  };

  return (
    <Box>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        formFields={config.getFields({ isEditMode })}
        formActions={
          !isEditMode && (
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
                {t('common:actions.save')}
              </Button>
            </>
          )
        }
      />
    </Box>
  );
};
