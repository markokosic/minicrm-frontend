import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { Form } from '@/components/ui/Form';
import { CUSTOMER_FORM_FIELDS } from '../../config/customers-form-fields';
import { getConsumerCustomerSchema } from '../../schemas/customers-schema';
import { ConsumerCustomer, CustomerType } from '../../types/customers-types';

interface ConsumerCustomerFormProps {
  customer?: ConsumerCustomer;
  isReadOnly: boolean;
}

export const ConsumerCustomerFormContent = ({
  customer,
  isReadOnly,
}: ConsumerCustomerFormProps) => {
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

  //TODO create Base Schema so all fields must be rendered in same order
  const CONSUMER_CUSTOMER_FORM_GROUPS = [
    {
      groupName: 'form:groups.general_information',
      layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
      fields: [
        {
          ...CUSTOMER_FORM_FIELDS[CustomerType.CONSUMER].firstName,
          isDisabled: isReadOnly,
          // allowedRoles: ['admin', 'mod'],
        },
        {
          ...CUSTOMER_FORM_FIELDS[CustomerType.CONSUMER].lastName,
          isDisabled: isReadOnly,
        },
      ],
    },
    {
      groupName: 'form:groups.contact',
      layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
      fields: [
        {
          ...CUSTOMER_FORM_FIELDS.common.email,
          isDisabled: isReadOnly,
        },
        {
          ...CUSTOMER_FORM_FIELDS.common.phone,
          isDisabled: isReadOnly,
        },
      ],
    },
  ];

  return (
    <Form
      methods={methods}
      onSubmit={() => null}
      formFields={CONSUMER_CUSTOMER_FORM_GROUPS}
    />
  );
};
