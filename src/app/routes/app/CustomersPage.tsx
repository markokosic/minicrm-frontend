import { useGetCustomers } from '@/modules/customers/hooks/useGetCustomers';
import { useTranslation } from 'react-i18next';

export const CustomersPage = () => {
  const { t } = useTranslation('common');
  const { data } = useGetCustomers();
  return (
    <>
      <title>{t('customers')}</title>
    </>
  );
};
