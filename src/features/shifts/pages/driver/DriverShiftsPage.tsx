import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Card, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { FloatingActionButton } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';

export const DriverShiftsPage = () => {
  const { t } = useTranslation(['common', 'app']);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const navigateToAddShift = () => {
    navigate(ROUTES.app.shifts.create.path);
  };

  const desktopActions = !isMobile ? (
    <Button leftSection={<Plus size={18} />} onClick={navigateToAddShift}>
      {t('app:shifts.actions.add', 'Schicht eintragen')}
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('common:navigation.shifts')}
      showBack={false}
      actions={desktopActions}
    >
      <Stack gap="lg" pb="xl">
        <Card withBorder radius="md" p="xl">
          <Title order={2}>{t('common:navigation.shifts')}</Title>
          <Text c="dimmed" mt="xs">
            Schichten
          </Text>
        </Card>
      </Stack>

      {isMobile && (
        <FloatingActionButton onClick={navigateToAddShift}>
          <Plus size={24} />
        </FloatingActionButton>
      )}
    </PageLayout>
  );
};

export default DriverShiftsPage;
