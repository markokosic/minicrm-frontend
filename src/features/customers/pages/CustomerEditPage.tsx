import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Menu } from '@mantine/core';
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

  const cId = Number(customerId);

  if (isNaN(cId)) {
    throw new Error('customerId param must be a number');
  }

  const { data } = useGetCustomer({
    id: cId,
  });

  const desktopActions = !isMobile ? (
    // <Button
    //   variant="outline"
    //   onClick={() => navigate(-1)}
    // >
    //   {t('common:actions.cancel')}
    // </Button>

    <Menu
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>

        <Menu.Item leftSection={<Edit size={14} />}>{t('common:actions.cancel')}</Menu.Item>
        {/* <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text
              size="xs"
              c="dimmed"
            >
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

        <Menu.Divider />

        {/* <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete my account
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  ) : null;

  return (
    <PageLayout
      title={t('navigation.customers')}
      // actions={desktopActions}
    >
      {data && (
        <CustomerForm
          customer={data}
          isReadOnly={false}
        />
      )}
    </PageLayout>
  );
};
