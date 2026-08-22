import { useTranslation } from 'react-i18next';
import { Stack, Text, Paper, Card, Flex, Group, Badge } from '@mantine/core';
import { ShiftRevenueEntryResponse } from '@/api/generated/model';
import { createFormatters } from '@/lib/utils';

interface ShiftViewRevenuesProps {
  revenues?: ShiftRevenueEntryResponse[] | null;
}

export const ShiftViewRevenues = ({ revenues }: ShiftViewRevenuesProps) => {
  const { t, i18n } = useTranslation(['app', 'common']);
  const fmt = createFormatters(i18n.language);

  return (
    <Stack gap="md">
      <Text fw={600} size="xl">
        {t('app:shifts.groups.revenues')}
      </Text>
      
      {(!revenues || revenues.length === 0) && (
        <Paper withBorder p="xl" radius="md" ta="center">
          <Text c="dimmed" size="lg">{t('app:shifts.empty', 'Keine Umsätze vorhanden.')}</Text>
        </Paper>
      )}

      {(revenues || []).map((rev, idx) => (
        <Card key={rev.id || idx} withBorder radius="md" shadow="xs" p="lg">
          <Flex 
            direction={{ base: 'column', sm: 'row' }} 
            gap="xl" 
            justify="space-between" 
            align={{ base: 'flex-start', sm: 'center' }}
          >
            <Stack gap="sm">
              <Group gap="sm">
                <Badge variant="light" color="blue" size="lg">
                  {rev.flatRateTypeName || rev.entryCategory}
                </Badge>
              </Group>
              {rev.entryCategory === 'FLAT_RATE' && (
                <Text c="dimmed">
                  {rev.tripCount || 1} {t('app:dashboard.trip_count', 'Fahrten')} × {rev.pricePerTrip ? fmt.number(rev.pricePerTrip) : '0,00'} €
                </Text>
              )}
            </Stack>
            
            <Group gap="xl" wrap="nowrap">
              <Stack gap={4} align="flex-end">
                <Text c="dimmed" tt="uppercase" fw={500}>{t('app:shifts.table.revenue')}</Text>
                <Text fw={600} size="lg">
                  {rev.revenue ? fmt.number(rev.revenue) : '0,00'} €
                </Text>
              </Stack>
              <Stack gap={4} align="flex-end">
                <Text c="dimmed" tt="uppercase" fw={500}>{t('app:shifts.table.driver_payout')}</Text>
                <Text fw={600} size="lg" c="teal.7">
                  {rev.driverRemuneration ? fmt.number(rev.driverRemuneration) : '0,00'} €
                </Text>
              </Stack>
              <Stack gap={4} align="flex-end">
                <Text c="dimmed" tt="uppercase" fw={500}>{t('app:shifts.table.company_share')}</Text>
                <Text fw={600} size="lg" c="indigo.7">
                  {rev.companyRemuneration ? fmt.number(rev.companyRemuneration) : '0,00'} €
                </Text>
              </Stack>
            </Group>
          </Flex>
        </Card>
      ))}
    </Stack>
  );
};
