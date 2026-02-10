import { Edit, EllipsisVertical, TestTube, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper/DataLoadingWrapper';
import { ActionMenu } from '@/components/ui/Menu';
import { SpeedDial } from '@/components/ui/Menu/SpeedDial';
import { ROUTES } from '@/config/routes';
import { CustomerFormSkeleton } from '@/features/customers/components/CustomerForm/CustomerFormSkelleton';
import { useGetCustomer } from '@/features/customers/hooks/useGetCustomer';
import { CustomerForm } from '../components/CustomerForm/CustomerForm';
import { CustomerGeneralTabContent } from '../components/CustomerTabs/CustomerGeneralTabContent';
import { VIEW_AND_EDIT_CUSTOMER_FORM_CONFIG } from '../config/customers-form-config';
import { CustomerType } from '../types/customers-types';

export const CustomerViewPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  const { customerId, tabValue } = useParams();

  const actions = [
    {
      label: t('common:actions.edit'),
      // onClick: navigateToEditCustomer,
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

  // const desktopActions = !isMobile ? (
  //   <ActionMenu
  //     actions={actions}
  //     isRound
  //   />
  // ) : null;

  return (
    <PageLayout
      title={t('common:navigation.customers')}
      // actions={desktopActions}
    >
      <Tabs
        value={tabValue}
        onChange={(value) => navigate(`${ROUTES.app.customers.view.getHref(customerId, tabValue)}`)}
        radius="lg"
        defaultValue="gallery"
      >
        <Tabs.List>
          <Tabs.Tab
            value="gallery"
            leftSection={<TestTube size={12} />}
          >
            General Information
          </Tabs.Tab>
          <Tabs.Tab
            value="messages"
            leftSection={<TestTube size={12} />}
          >
            Addresses
          </Tabs.Tab>
          <Tabs.Tab
            value="settings"
            leftSection={<TestTube size={12} />}
          >
            Contacts
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <CustomerGeneralTabContent />
        </Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>

      {/* {isMobile && (
        <SpeedDial
          Icon={EllipsisVertical}
          actions={actions}
        />
      )} */}
    </PageLayout>
  );
};
