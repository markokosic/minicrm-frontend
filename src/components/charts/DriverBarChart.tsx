import { useTranslation } from 'react-i18next';
import { BarChart } from '@mantine/charts';
import { Box, Center, Paper, Stack, Text, Title } from '@mantine/core';

export interface DriverBarChartProps {
  data: Array<{
    name: string;
    revenue: number;
    trips?: number;
  }>;
  title?: string;
  subtitle?: string;
  height?: number;
}

export const DriverBarChart = ({
  data,
  title,
  subtitle,
  height = 300,
}: DriverBarChartProps) => {
  const { t, i18n } = useTranslation(['app']);

  const chartTitle = title || t('app:dashboard.charts.series.driver_share');
  const series = [{ name: 'revenue', label: t('app:dashboard.charts.series.revenue'), color: 'indigo.6' }];
  const isEmpty = !data || data.length === 0;

  return (
    <Paper
      p="md"
      withBorder
      radius="md"
      shadow="xs"
      h="100%"
      w="100%"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}
    >
      <Stack gap="xs" mb="md">
        <Title order={4}>{chartTitle}</Title>
        {subtitle && (
          <Text size="xs" c="dimmed">
            {subtitle}
          </Text>
        )}
      </Stack>

      <Box style={{ width: '100%', minWidth: 0, flex: 1 }}>
        {isEmpty ? (
          <Center h={height}>
            <Text size="sm" c="dimmed">
              {t('app:dashboard.charts.empty.general')}
            </Text>
          </Center>
        ) : (
          <BarChart
            h={height}
            data={data}
            dataKey="name"
            series={series}
            gridAxis="xy"
            tickLine="y"
            barProps={{ radius: [6, 6, 0, 0] }}
            valueFormatter={(val) => `${val.toLocaleString(i18n.language || 'de-DE')} €`}
          />
        )}
      </Box>
    </Paper>
  );
};
