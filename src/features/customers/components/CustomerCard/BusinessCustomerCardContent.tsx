import { BusinessCustomer } from '../../types/customersTypes';

interface BusinessCustomerCardProps {
  customer: BusinessCustomer;
}

export const BusinessCustomerCardContent = ({ customer }: BusinessCustomerCardProps) => {
  const { companyName } = customer;
  return (
    <>
      <p>{companyName}</p>
    </>
  );
};
