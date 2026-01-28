import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box } from '@mantine/core';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { ROUTES } from '@/config/routes';
import { CUSTOMER_FORM_CONFIG, CustomerFormConfig } from '../../config/customers-form-config';
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer';
import { Customer, CustomerType } from '../../types/customers-types';

interface CustomerFormProps {
  customer: Customer;
  isReadOnly: boolean;
}

export const CustomerForm = ({ customer, isReadOnly }: CustomerFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useUpdateCustomer({});

  let config: CustomerFormConfig<any>;

  if (customer.type === CustomerType.BUSINESS) {
    config = CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS];
  } else {
    config = CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER];
  }

  const methods = useForm<typeof customer>({
    resolver: config.getResolver(t),
    defaultValues: config.getDefaultValues(customer),
  });

  const onSubmit = (data: typeof customer) => {
    const updateDTO = config.mapper(data);

    mutate(
      { id: customer.id, data: updateDTO },
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
        formFields={config.getFields({ isReadOnly })}
        formActions={
          !isReadOnly && (
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
