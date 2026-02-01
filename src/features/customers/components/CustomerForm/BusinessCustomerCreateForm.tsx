import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mantine/core';
import { Form } from '@/components/ui/Form';
import { ROUTES } from '@/config/routes';
import { ADD_CUSTOMER_FORM_CONFIG } from '../../config/customers-form-config';
import { useAddCustomer } from '../../hooks/useAddCustomer';
import { AddBusinessCustomer, CustomerType } from '../../types/customers-types';

export const BusinessCustomerCreateForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useAddCustomer({});

  const config = ADD_CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS];

  const methods = useForm<AddBusinessCustomer>({
    resolver: config.getResolver(t),
    defaultValues: config.getDefaultValues(),
  });

  const onSubmit = (data: AddBusinessCustomer) => {
    mutate(
      { data: config.mapper(data, CustomerType.BUSINESS) },
      {
        onSuccess: (data) => {
          const newCustomerId = data?.id;
          navigate(ROUTES.app.customers.view.getHref(newCustomerId));
          toast.success(t('customers:notifications.create.success'));
        },
      }
    );
  };

  return (
    <Box>
      <Form
        withBorder
        shadow="sm"
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
