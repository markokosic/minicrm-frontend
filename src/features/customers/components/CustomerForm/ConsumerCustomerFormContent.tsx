import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form';
import { CUSTOMER_FORM_FIELDS } from '../../config/customers-form-fields';
import { getConsumerCustomerSchema } from '../../schemas/customer-business-schema';
import { ConsumerCustomer } from '../../types/customers-types';

interface ConsumerCustomerFormProps {
  customer?: ConsumerCustomer;
}

export const ConsumerCustomerFormContent = ({ customer }: ConsumerCustomerFormProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: zodResolver(getConsumerCustomerSchema(t)),
    defaultValues: {
      firstName: customer?.firstName ?? '',
      lastName: customer?.lastName ?? '',
      phone: customer?.phone ?? '',
      email: customer?.email ?? '',
    },
  });

  const fields = [
    CUSTOMER_FORM_FIELDS.CONSUMER.firstName,
    CUSTOMER_FORM_FIELDS.CONSUMER.lastName,
    CUSTOMER_FORM_FIELDS.common.phone,
    CUSTOMER_FORM_FIELDS.common.email,
  ];
  return (
    <Form
      methods={methods}
      onSubmit={() => null}
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
    </Form>
  );
};
