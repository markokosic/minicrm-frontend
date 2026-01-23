import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Text } from '@mantine/core';
import { PageLayout } from '@/components/layout/PageLayout';
import { CustomerForm } from '@/features/customers/components/CustomerForm/CustomerForm';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';

export const CustomerPage = () => {
  const { t } = useTranslation('common');

  const params = useParams();
  if (!params.customerId) {
    throw new Error('customerId param is required');
  }

  // ?edit=true

  const { data, isLoading } = useGetCustomer({ id: params.customerId ?? undefined });

  if (!data) {
    return <Text>Lade Kunden...</Text>;
  }

  return (
    <PageLayout title={t('navigation.customers')}>
      <CustomerForm customer={data} />;
    </PageLayout>
  );
};
