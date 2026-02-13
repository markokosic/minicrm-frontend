import { Book, Contact, Edit, MapPinHouse, TestTube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/config/routes';
import { CustomerTabs } from '@/types/routing-types';
import { CustomerGeneralTabContent } from '../components/CustomerTabs/CustomerGeneralTabContent';
import { useCustomerParams } from '../hooks/useCustomerParams';

export const CustomerViewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { customerId, tabValue, isInvalid } = useCustomerParams();

  if (isInvalid) {
    return <div>Ungültige Kunden-ID</div>;
  }

  return (
    <PageLayout
      title={t('common:navigation.customers')}
      backFallback={ROUTES.app.customers.getHref()}
      // actions={desktopActions}
    >
      <Tabs
        value={tabValue}
        onChange={(value) => {
          if (value) {
            navigate(ROUTES.app.customers.view.getHref(customerId, value as CustomerTabs));
          }
        }}
        radius="lg"
        defaultValue="gallery"
      >
        <Tabs.List>
          <Tabs.Tab
            value={CustomerTabs.GENERAL}
            leftSection={<Book size={12} />}
          >
            General Information
          </Tabs.Tab>
          <Tabs.Tab
            value={CustomerTabs.ADDRESSES}
            leftSection={<MapPinHouse size={12} />}
          >
            Addresses
          </Tabs.Tab>
          <Tabs.Tab
            value={CustomerTabs.CONTACTS}
            leftSection={<Contact size={12} />}
          >
            Contacts
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={CustomerTabs.GENERAL}>
          <CustomerGeneralTabContent />
        </Tabs.Panel>

        <Tabs.Panel value={CustomerTabs.ADDRESSES}>Addresses tab content</Tabs.Panel>

        <Tabs.Panel value={CustomerTabs.CONTACTS}>Contacts tab content</Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
