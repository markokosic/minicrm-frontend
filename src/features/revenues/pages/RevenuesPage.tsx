import { PlusCircle, ReceiptEuro } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Group, Pagination, Paper, Skeleton, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetAllDailyRevenues } from '@/api/generated/endpoints/revenues/revenues';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { ActionMenu } from '@/components/ui/Menu';
import { SpeedDial } from '@/components/ui/Menu/SpeedDial';
import { useUrlFilters } from '@/common/hooks/useUrlFilters';
import { ROUTES } from '@/config/routes';
import { RevenuesList } from '../components/RevenuesList';
import { RevenueFilters } from '../components/RevenueFilters';

export const RevenuesPage = () => {
  const { t } = useTranslation(['revenues', 'common', 'app' ]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const navigateToBulkRevenues = () => navigate(ROUTES.app.revenues.createBulk.getHref());

  const { getFilter, setPage } = useUrlFilters();
  const page = Number(getFilter('page', '1')) || 1;
  const size = 10;

  const driverId = getFilter('driverId') ? Number(getFilter('driverId')) : undefined;
  const dateFrom = getFilter('dateFrom') || undefined;
  const dateTo = getFilter('dateTo') || undefined;

  const {
    data: response,
    isPending: isLoading,
    error,
  } = useGetAllDailyRevenues({
    pageable: { page, size },
    driverId,
    dateFrom,
    dateTo,
  });
  const data = response?.data;

  const menuActions = [
    {
      label: t('app:revenues.record_revenue.daily'),
      icon: ReceiptEuro,
      onClick: navigateToBulkRevenues,
    },
  ];

  const listSkeleton = (
    <Stack gap="md">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Paper
          key={idx}
          p="md"
          withBorder
          radius="md"
        >
          <Skeleton
            height={20}
            width="40%"
            mb="sm"
          />
          <Skeleton
            height={50}
            mb="sm"
          />
          <Skeleton
            height={20}
            width="20%"
          />
        </Paper>
      ))}
    </Stack>
  );

  return (
    <PageLayout
      title={t('common:revenues')}
      showBack={false}
      actions={<ActionMenu actions={menuActions} />}
    >
      <Stack
        gap="lg"
        style={{ width: '100%' }}
      >
        <RevenueFilters />

        <DataLoadingWrapper
          isLoading={isLoading}
          error={error}
          isEmpty={!data || data.totalElements === 0}
          skeleton={listSkeleton}
        >
          {data && <RevenuesList revenues={data.content ?? []} />}
        </DataLoadingWrapper>

        {data && data.totalPages !== undefined && data.totalPages > 1 && (
          <Group
            justify="center"
            mt="md"
            mb="xl"
          >
            <Pagination
              value={page}
              onChange={(val) => setPage(val)}
              total={data.totalPages ?? 1}
              withEdges
            />
          </Group>
        )}
      </Stack>

      {isMobile && (
        <SpeedDial
          actions={menuActions}
          Icon={PlusCircle}
        />
      )}
    </PageLayout>
  );
};
