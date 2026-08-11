import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Box, Center, Loader, SimpleGrid, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { RevenueAreaChart, ShareDonutChart, TripsBarChart } from '@/components/charts';
import {
  DashboardSummary,
  useGetDashboardSummary,
  useGetRevenueReport,
} from '@/features/reports';

export interface MonthlyDashboardViewProps {
  year: number;
  month: number;
}

export const MonthlyDashboardView = ({ year, month }: MonthlyDashboardViewProps) => {
  const { t } = useTranslation(['app', 'common']);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const dateFrom = dayjs(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
  const dateTo = dayjs(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

  const { data: monthData, isLoading: isSummaryLoading } = useGetDashboardSummary({ year, month });
  const { data: monthReport, isLoading: isReportLoading } = useGetRevenueReport({
    dateFrom,
    dateTo,
    driverId: null,
    groupBy: 'DAY',
  });

  const isLoading = isSummaryLoading || isReportLoading;

  const areaChartData =
    monthReport?.rows.map((row) => ({
      date: dayjs(row.date).format('DD.MM.'),
      revenue: row.revenue,
      companyRemuneration: row.companyRemuneration,
      driverRemuneration: row.driverRemuneration,
    })) ?? [];

  const tripsChartData =
    monthReport?.rows.map((row) => ({
      label: dayjs(row.date).format('DD.MM.'),
      trips: row.entryCount,
      km: row.kilometersDriven,
    })) ?? [];

  if (isLoading) {
    return (
      <Center h={300}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Stack gap="xl" style={{ width: '100%', minWidth: 0 }}>
      <DashboardSummary
        data={monthData}
        title={t('app:dashboard.monthly_summary', { month, year })}
      />

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" style={{ width: '100%', minWidth: 0 }}>
        <Box style={{ gridColumn: isMobile ? 'span 1' : 'span 2', minWidth: 0 }}>
          <RevenueAreaChart
            data={areaChartData}
            title={t('app:dashboard.charts.revenue_timeline_title')}
            subtitle={t('app:dashboard.charts.revenue_timeline_subtitle')}
            height={280}
          />
        </Box>

        <Box style={{ gridColumn: 'span 1', minWidth: 0 }}>
          <ShareDonutChart
            companyShare={monthData?.companyShare ?? 0}
            driverShare={monthData?.driverShare ?? 0}
            totalRevenue={monthData?.totalRevenue ?? 0}
            title={t('app:dashboard.charts.monthly_share_title')}
            height={200}
          />
        </Box>
      </SimpleGrid>

      <TripsBarChart
        data={tripsChartData}
        title={t('app:dashboard.charts.monthly_trips_title')}
        subtitle={t('app:dashboard.charts.monthly_trips_subtitle')}
        height={260}
      />
    </Stack>
  );
};
