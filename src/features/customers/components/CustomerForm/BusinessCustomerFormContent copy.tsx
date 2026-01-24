import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/components/ui/Form';
import { CUSTOMER_FORM_FIELDS } from '../../config/customers-form-fields';
import { getBusinessCustomerSchema } from '../../schemas/customer-business-schema';
import { BusinessCustomer, CustomerType } from '../../types/customers-types';

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

  const BUSINESS_CUSTOMER_FORM_GROUPS = [
    {
      groupName: 'form:groups.general_information',
      layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
      fields: [
        {
          ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].companyName,
          isDisabled: false,
          allowedRoles: ['admin', 'mod'],
        },
        CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].vat,
      ],
    },
    {
      groupName: 'form:groups.contact',
      layout: { desktop: { columns: 3 }, mobile: { columns: 1 } },
      fields: [
        CUSTOMER_FORM_FIELDS.common.email,
        CUSTOMER_FORM_FIELDS.common.phone,
        CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].website,
      ],
    },
  ];

  console.log(BUSINESS_CUSTOMER_FORM_GROUPS);

  return (
    <Form
      methods={methods}
      onSubmit={() => null}
      formFields={BUSINESS_CUSTOMER_FORM_GROUPS}
    />
  );
};
