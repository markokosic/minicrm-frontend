import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { CustomersList } from '@/features/customers/components/CustomersList';

export const CustomersPage = () => {
  const { t } = useTranslation('common');

  return (
    <PageLayout title={t('navigation.customers')}>
      <CustomersList />
    </PageLayout>
  );
};
