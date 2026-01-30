import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box } from '@mantine/core';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { ROUTES } from '@/config/routes';
import { VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG } from '../../config/customers-form-config';
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer';
import { CustomerType, UpdateBusinessCustomer } from '../../types/customers-types';

interface Props {
  customer: UpdateBusinessCustomer;
  isReadOnly: boolean;
}

export const BusinessCustomerDetailsForm = ({ customer, isReadOnly }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateCustomer({});

  const config = VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS];

  const methods = useForm<UpdateBusinessCustomer>({
    resolver: config.getResolver(t),
    defaultValues: config.getDefaultValues(customer),
  });

  const onSubmit = (data: UpdateBusinessCustomer) => {
    mutate(
      { id: customer.id, data: config.mapper(data) },
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
