import { useParams } from 'react-router';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';

export const CustomerPage = () => {
  const params = useParams();
  if (!params.customerId) {
    throw new Error('customerId param is required');
  }

  //fetcht customer via hook
  //kapselt logik wie loading state
  // ?edit=true

  const { data } = useGetCustomer({ id: params.customerId ?? undefined });
  console.log(data, 'keko meko');

  return <></>;
};
