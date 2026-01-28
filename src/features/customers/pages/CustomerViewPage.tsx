import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Menu } from '@mantine/core';
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

  const cId = Number(customerId);

  if (isNaN(cId)) {
    throw new Error('customerId param must be a number');
  }

  const navigateToCustomer = () => navigate(ROUTES.app.customers.edit.getHref(customerId));

  const { data, isLoading, error } = useGetCustomer({
    id: cId,
  });

  const desktopActions = !isMobile ? (
    <Menu
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Button
          radius="100%"
          size="lg"
          styles={{
            root: {
              width: 48,
              height: 48,
              padding: 0,
            },
          }}
          variant="light"
        >
          <EllipsisVertical />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={navigateToCustomer}
          leftSection={<Edit size={14} />}
        >
          {t('common:actions.edit')}
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => null}
          leftSection={<Trash size={14} />}
        >
          {t('common:actions.delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
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
