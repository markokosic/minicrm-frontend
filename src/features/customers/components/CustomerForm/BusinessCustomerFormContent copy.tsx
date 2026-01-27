import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { CUSTOMER_FORM_FIELDS } from '../../config/customers-form-fields';
import { useUpdateCustomer } from '../../hooks/useUpdateCustomer';
import { getBusinessCustomerSchema } from '../../schemas/customers-schema';
import { BusinessCustomer, CustomerType } from '../../types/customers-types';

interface BusinessCustomerFormProps {
  customer: BusinessCustomer;
  isReadOnly: boolean;
}

export const BusinessCustomerFormContent = ({
  customer,
  isReadOnly,
}: BusinessCustomerFormProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: zodResolver(getBusinessCustomerSchema(t)),
    defaultValues: {
      id: customer.id,
      type: customer.type,
      tenantId: customer.tenantId,
      companyName: customer.companyName,
      vat: customer.vat,
      email: customer.email,
      website: customer.website,
      phone: customer.phone,
    },
  });

  const { mutate, isPending } = useUpdateCustomer({
    onSuccess: () => {
      console.log('Update erfolgreich!');
    },
    onError: (error) => {
      console.error('Update fehlgeschlagen:', error.message);
    },
  });

  const onSubmit = (data: Partial<BusinessCustomer>) => {
    console.log(data);
    mutate({
      id: customer.id,
      data,
    });
  };

  //TODO create Base Schema so all fields must be rendered in same order
  const BUSINESS_CUSTOMER_FORM_GROUPS = [
    {
      groupName: 'form:groups.general_information',
      layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
      fields: [
        {
          ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].companyName,
          isDisabled: isReadOnly,
          // allowedRoles: ['admin', 'mod'],
        },
        {
          ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].vat,
          isDisabled: isReadOnly,
        },
      ],
    },
    {
      groupName: 'form:groups.contact',
      layout: { desktop: { columns: 3 }, mobile: { columns: 1 } },
      fields: [
        {
          ...CUSTOMER_FORM_FIELDS.common.email,
          isDisabled: isReadOnly,
        },
        {
          ...CUSTOMER_FORM_FIELDS.common.phone,
          isDisabled: isReadOnly,
        },
        {
          ...CUSTOMER_FORM_FIELDS[CustomerType.BUSINESS].website,
          isDisabled: isReadOnly,
        },
      ],
    },
  ];

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      formFields={BUSINESS_CUSTOMER_FORM_GROUPS}
      formActions={
        !isReadOnly && (
          <Button
            type="submit"
            loading={isPending}
            disabled={!methods.formState.isDirty}
          >
            SAVE
          </Button>
        )
      }
    />
  );
};
