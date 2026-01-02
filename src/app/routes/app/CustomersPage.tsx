import { useTranslation } from 'react-i18next';
import { useGetCustomers } from '@/features/customers/hooks/useGetCustomers';
import { getUser } from '@/lib/auth';

export const CustomersPage = () => {
  const { t } = useTranslation('common');
  const { data } = useGetCustomers();
  getUser();

  return (
    <>
      <title>{t('customers')}</title>
    </>
  );
};
