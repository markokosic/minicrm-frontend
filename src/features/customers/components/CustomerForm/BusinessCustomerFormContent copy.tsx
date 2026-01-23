import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form';
import { CUSTOMER_FORM_FIELDS } from '../../config/customers-form-fields';
import { getBusinessCustomerSchema } from '../../schemas/customer-business-schema';
import { BusinessCustomer } from '../../types/customers-types';

interface BusinessCustomerFormProps {
  customer: BusinessCustomer;
}

export const BusinessCustomerFormContent = ({ customer }: BusinessCustomerFormProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: zodResolver(getBusinessCustomerSchema(t)),
    defaultValues: {
      companyName: customer.companyName,
      vat: customer.vat,
      email: customer.email,
    },
  });

  const fields = [
    CUSTOMER_FORM_FIELDS.BUSINESS.companyName,
    CUSTOMER_FORM_FIELDS.BUSINESS.vat,
    CUSTOMER_FORM_FIELDS.common.phone,
    CUSTOMER_FORM_FIELDS.common.email,
    CUSTOMER_FORM_FIELDS.BUSINESS.website,
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
