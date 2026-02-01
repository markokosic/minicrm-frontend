import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { FloatingActionButton } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';
import { CustomersList } from '@/features/customers/components/CustomersList';

export const CustomersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const goToAddCustomer = () => {
    navigate(ROUTES.app.customers.add.path);
  };

  const desktopActions = !isMobile ? (
    <Button
      leftSection={<Plus />}
      onClick={goToAddCustomer}
    >
      {t('customers:actions.add_customer')}
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('common:navigation.customers')}
      showBack={false}
      actions={desktopActions}
    >
      <CustomersList />

      {isMobile && (
        <FloatingActionButton onClick={goToAddCustomer}>
          <Plus size={24} />
        </FloatingActionButton>
      )}
    </PageLayout>
  );
};
