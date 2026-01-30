import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box } from '@mantine/core';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { ADD_CUSTOMER_FORM_CONFIG } from '../../config/customers-form-config';
import { useAddCustomer } from '../../hooks/useAddCustomer';
import { AddConsumerCustomer, CustomerType } from '../../types/customers-types';

export const AddConsumerCustomerForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useAddCustomer({});

  const config = ADD_CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER];

  const methods = useForm<AddConsumerCustomer>({
    resolver: config.getResolver(t),
    defaultValues: config.getDefaultValues(),
  });

  const onSubmit = (data: AddConsumerCustomer) => {
    mutate(
      { data: config.mapper(data, CustomerType.CONSUMER) },
      {
        onSuccess: () => {
          //   navigate(ROUTES.app.customers.view.getHref(customer.id));
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
