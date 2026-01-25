import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button, FloatingActionButton } from '@/components/ui/Button';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper/DataLoadingWrapper';
import { CustomerForm } from '@/features/customers/components/CustomerForm/CustomerForm';
import { CustomerFormSkeleton } from '@/features/customers/components/CustomerForm/CustomerFormSkelleton';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';

export const CustomerViewPage = () => {
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { customerId } = useParams();

  if (!customerId) {
    throw new Error('customerId param is required');
  }

  const { data, isLoading, error } = useGetCustomer({
    id: customerId ?? undefined,
  });

  const desktopActions = !isMobile ? (
    <Button
      leftSection={<Edit />}
      onClick={() => undefined}
    >
      Edit
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('navigation.customers')}
      actions={desktopActions}
    >
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={!data}
        skeleton={<CustomerFormSkeleton />}
      >
        {data && <CustomerForm customer={data} />}
      </DataLoadingWrapper>
      <FloatingActionButton onClick={() => null}>
        <Edit size={24} />
      </FloatingActionButton>
    </PageLayout>
  );
};
