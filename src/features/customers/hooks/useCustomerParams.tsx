import { useParams } from 'react-router';
import { CustomerTabs } from '@/types/routing-types';

export const useCustomerParams = () => {
  const { customerId, tabValue } = useParams<{ customerId: string; tabValue: string }>();

  const id = customerId ? parseInt(customerId, 10) : NaN;

  const isValidTab = Object.values(CustomerTabs).includes(tabValue as CustomerTabs);
  const tab = isValidTab ? (tabValue as CustomerTabs) : CustomerTabs.GENERAL;

  return {
    customerId: id,
    tabValue: tab,
    isInvalid: isNaN(id),
  };
};
