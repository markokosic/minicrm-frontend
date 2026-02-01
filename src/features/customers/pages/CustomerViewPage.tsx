import { Edit, EllipsisVertical, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper/DataLoadingWrapper';
import { ActionMenu } from '@/components/ui/Menu';
import { SpeedDial } from '@/components/ui/Menu/SpeedDial';
import { ROUTES } from '@/config/routes';
import { CustomerFormSkeleton } from '@/features/customers/components/CustomerForm/CustomerFormSkelleton';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';
import { CustomerForm } from '../components/CustomerForm/CustomerForm';
import { VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG } from '../config/customers-form-config';
import { CustomerType } from '../types/customers-types';

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

  const navigateToEditCustomer = () => navigate(ROUTES.app.customers.edit.getHref(cId));

  const { data, isLoading, error } = useGetCustomer({
    id: cId,
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

  const desktopActions = !isMobile ? (
    <ActionMenu
      actions={actions}
      isRound
    />
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
          <>
            {data.type === CustomerType.BUSINESS ? (
              <CustomerForm
                customer={data}
                isEditMode
                config={VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.BUSINESS]}
              />
            ) : (
              <CustomerForm
                customer={data}
                isEditMode
                config={VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG[CustomerType.CONSUMER]}
              />
            )}
          </>
        )}
      </DataLoadingWrapper>

      {isMobile && (
        <SpeedDial
          Icon={EllipsisVertical}
          actions={actions}
        />
      )}
    </PageLayout>
  );
};
