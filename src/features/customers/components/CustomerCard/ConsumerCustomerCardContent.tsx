import { CircleUser, Mail, Phone } from 'lucide-react';
import { ConsumerCustomer } from '../../types/customers-types';
import { CustomerCardHeader } from './shared/CustomerCardHeader';
import { CustomerCardLayout } from './shared/CustomerCardLayout';
import { CustomerCardRow } from './shared/CustomerCardRow';

interface ConsumerCustomerCardProps {
  customer: ConsumerCustomer;
}

export const ConsumerCustomerCardContent = ({ customer }: ConsumerCustomerCardProps) => {
  const { firstName, lastName, email, phone } = customer;

  return (
    <CustomerCardLayout avatar={<CircleUser size={24} />}>
      <CustomerCardHeader title={`${firstName} ${lastName}`} />

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
