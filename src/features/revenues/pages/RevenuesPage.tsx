import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Button, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageLayout } from '@/components/layout/PageLayout';
import { FloatingActionButton } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';
import { RevenueFilters } from '../components/RevenueFilters';
import { RevenuesList } from '../components/RevenuesList';

export const RevenuesPage = () => {
  const { t } = useTranslation(['revenues', 'common', 'app']);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const navigateToBulkRevenues = () => navigate(ROUTES.app.revenues.createBulk.getHref());

  const desktopActions = !isMobile ? (
    <Button
      leftSection={<Plus size={18} />}
      onClick={navigateToBulkRevenues}
    >
      {t('app:revenues.record_revenue.daily')}
    </Button>
  ) : null;

  return (
    <PageLayout
      title={t('common:navigation.revenues')}
      showBack={false}
      actions={desktopActions}
      fullHeight
    >
      <Stack
        gap="md"
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <Box style={{ flexShrink: 0 }}>
          <RevenueFilters />
        </Box>
        <Box style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
          <RevenuesList />
        </Box>
      </Stack>

      {isMobile && (
        <FloatingActionButton onClick={navigateToBulkRevenues}>
          <Plus size={24} />
        </FloatingActionButton>
      )}
    </PageLayout>
  );
};

export default RevenuesPage;



