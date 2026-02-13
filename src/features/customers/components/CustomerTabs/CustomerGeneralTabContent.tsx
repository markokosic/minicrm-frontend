import { Edit, EllipsisVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { ActionMenu } from '@/components/ui/Menu';
import { SpeedDial } from '@/components/ui/Menu/SpeedDial';
import { TabContentLayout } from '@/components/ui/Tab';
import { ROUTES } from '@/config/routes';
import { CustomerTabs } from '@/types/routing-types';
import { VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG } from '../../config/customers-form-config';
import { useCustomerParams } from '../../hooks/useCustomerParams';
import { useGetCustomer } from '../../hooks/useGetCustomer';
import { CustomerType } from '../../types/customers-types';
import { CustomerForm, CustomerFormSkeleton } from '../CustomerForm';

export const CustomerGeneralTabContent = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { customerId } = useCustomerParams();

  const navigateToEditCustomer = () =>
    navigate(ROUTES.app.customers.edit.getHref(customerId, CustomerTabs.GENERAL));

  const { data, isLoading, error } = useGetCustomer({
    id: customerId,
  });

  const actions = [
    {
      label: t('common:actions.edit'),
      onClick: navigateToEditCustomer,
      icon: Edit,
      color: 'default',
    },
    // {
    //   label: t('common:actions.delete'),
    //   onClick: () => console.log('Delete clicked'),
    //   icon: Trash2,
    //   color: 'red',
    // },
  ];

  return (
    <TabContentLayout
      isLoading={isLoading}
      error={error}
      isEmpty={!data}
      skeleton={<CustomerFormSkeleton />}
      actions={actions}
    >
      {data && data.type === CustomerType.CONSUMER && (
        <CustomerForm
          customer={data}
          isEditMode
          config={VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER]}
        />
      )}

      {data && data.type === CustomerType.BUSINESS && (
        <CustomerForm
          customer={data}
          isEditMode
          config={VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS]}
        />
      )}
    </TabContentLayout>
  );
};
