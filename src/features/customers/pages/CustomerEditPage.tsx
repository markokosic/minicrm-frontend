import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router';
import { Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button, FloatingActionButton } from '@/components/ui/Button';
import { CustomerForm } from '@/features/customers/components/CustomerForm/CustomerForm';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';

export const CustomerEditPage = () => {
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { customerId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!customerId) {
    throw new Error('customerId param is required');
  }

  // ?edit=true

  const { data, isLoading } = useGetCustomer({
    id: customerId ?? undefined,
  });

  // if (!data) {
  //   return <Text>Lade Kunden...</Text>;
  // }

  const handleEditMode = () => {
    const newParams = new URLSearchParams();
    return;
  };

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
      <CustomerForm customer={data} />;
      <FloatingActionButton onClick={() => null}>
        <Edit size={24} />
      </FloatingActionButton>
    </PageLayout>
  );
};
