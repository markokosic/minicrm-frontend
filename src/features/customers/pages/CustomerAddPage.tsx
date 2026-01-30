import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { AddConsumerCustomerForm } from '../components/CustomerForm/AddConsumerCustomerForm';

export const CustomerAddPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('customers:actions.add_customer')}
      // actions={desktopActions}
    >
      <AddConsumerCustomerForm />
    </PageLayout>
  );
};
