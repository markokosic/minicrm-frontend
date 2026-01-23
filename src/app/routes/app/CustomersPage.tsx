import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ActionIcon, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/config/routes';
import { CustomersList } from '@/features/customers/components/CustomersList';

export const CustomersPage = () => {
  const { t } = useTranslation('common');
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
      Add Customer
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('navigation.customers')}
      showBack={false}
      actions={desktopActions}
    >
      <CustomersList />

      {/* {isMobile && ( */}
      <ActionIcon
        size="xl"
        radius="xl"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
        onClick={goToAddCustomer}
      >
        <Plus size={24} />
      </ActionIcon>
      {/* )} */}
    </PageLayout>
  );
};
