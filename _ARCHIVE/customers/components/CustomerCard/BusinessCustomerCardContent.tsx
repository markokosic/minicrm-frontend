import { Building2, Mail, Phone } from 'lucide-react';
import { BusinessCustomer } from '../../types/customers-types';
import { CustomerCardHeader } from './shared/CustomerCardHeader';
import { CustomerCardLayout } from './shared/CustomerCardLayout';
import { CustomerCardRow } from './shared/CustomerCardRow';

interface BusinessCustomerCardProps {
  customer: BusinessCustomer;
}

export const BusinessCustomerCardContent = ({ customer }: BusinessCustomerCardProps) => {
  const { companyName, email, phone } = customer;

  //TODO add fallback if no email or phone

  return (
    <CustomerCardLayout avatar={<Building2 size={24} />}>
      <CustomerCardHeader title={`${companyName}`} />

      <CustomerCardRow
        icon={<Mail size={14} />}
        href={`mailto:${email}`}
      >
        {email}
      </CustomerCardRow>
      <CustomerCardRow
        icon={<Phone size={14} />}
        href={`tel:${phone}`}
      >
        {phone}
      </CustomerCardRow>
    </CustomerCardLayout>
  );
};
