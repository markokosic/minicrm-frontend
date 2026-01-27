import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { CustomerForm } from '@/features/customers/components/CustomerForm/CustomerForm';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';

export const CustomerEditPage = () => {
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { customerId } = useParams();
  const navigate = useNavigate();

  if (!customerId) {
    throw new Error('customerId param is required');
  }

  const { data } = useGetCustomer({
    id: customerId,
  });

  const desktopActions = !isMobile ? (
    <Button
      variant="outline"
      onClick={() => navigate(-1)}
    >
      Cancel
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('navigation.customers')}
      actions={desktopActions}
    >
      {data && (
        <CustomerForm
          customer={data}
          isReadOnly={false}
        />
      )}
      {/* <FloatingActionButton onClick={() => location(-1)}>
        <Edit size={24} />
      </FloatingActionButton> */}
    </PageLayout>
  );
};
