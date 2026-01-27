import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button, FloatingActionButton } from '@/components/ui/Button';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper/DataLoadingWrapper';
import { ROUTES } from '@/config/routes';
import { CustomerForm } from '@/features/customers/components/CustomerForm/CustomerForm';
import { CustomerFormSkeleton } from '@/features/customers/components/CustomerForm/CustomerFormSkelleton';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';

export const CustomerViewPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const { customerId } = useParams();

  if (!customerId) {
    throw new Error('customerId param is required');
  }

  const navigateToCustomer = () => navigate(ROUTES.app.customers.edit.getHref(customerId));

  const { data, isLoading, error } = useGetCustomer({
    id: customerId,
  });

  const desktopActions = !isMobile ? (
    <Button
      leftSection={<Edit />}
      onClick={navigateToCustomer}
    >
      {t('common:actions.edit')}
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('common:navigation.customers')}
      actions={desktopActions}
    >
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={!data}
        skeleton={<CustomerFormSkeleton />}
      >
        {data && (
          <CustomerForm
            customer={data}
            isReadOnly
          />
        )}
      </DataLoadingWrapper>
      <FloatingActionButton onClick={navigateToCustomer}>
        <Edit size={24} />
      </FloatingActionButton>
    </PageLayout>
  );
};
