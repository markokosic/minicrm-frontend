import { PageLayout } from '@/components/layout/PageLayout';
import { Title, Text, Stack, Card } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const DriverDashboardPage = () => {
  const { t } = useTranslation(['common']);

  return (
    <PageLayout
      title={t('common:navigation.dashboard')}
      showBack={false}
    >
      <Stack gap="lg" pb="xl">
        <Card withBorder radius="md" p="xl">
          <Title order={2}>Hallo Driver</Title>
          <Text c="dimmed" mt="xs">
            Willkommen in deinem Fahrer-Dashboard.
          </Text>
        </Card>
      </Stack>
    </PageLayout>
  );
};

export default DriverDashboardPage;
