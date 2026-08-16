import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Badge, Card, Group, Paper, SimpleGrid, Stack, Table, Text, Button } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { useGetShiftById } from '@/api/generated/endpoints/shifts/shifts';
import { ROUTES } from '@/config/routes';
import { calculateShiftTotals, formatShiftDate, formatShiftTime } from '../utils/shift-calculations.utils';

export const ShiftViewPage = () => {
  const { t } = useTranslation(['app', 'common']);
  const { shiftId } = useParams<{ shiftId: string }>();
  const navigate = useNavigate();

  const { data: response, isLoading, error } = useGetShiftById(Number(shiftId), {
    query: {
      enabled: !!shiftId && !isNaN(Number(shiftId)),
    },
  });

  const shift = response?.data;

  const { totalRevenue, totalDriverRemuneration, totalCompanyRemuneration } =
    calculateShiftTotals(shift?.revenues || []);

  const statusColor =
    shift?.status === 'APPROVED' ? 'green' : shift?.status === 'PENDING' ? 'yellow' : 'red';

  return (
    <PageLayout 
      title={`${t('app:shifts.detail_title')} #${shiftId}`}
      actions={
        <Button
          variant="light"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => navigate(ROUTES.app.shifts.path)}
        >
          {t('common:actions.back')}
        </Button>
      }
    >
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={!isLoading && !shift}
      >
        {shift && (
          <Stack gap="md">
            {/* Header Metadata Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
              <Card withBorder padding="xs" radius="md">
                <Text size="xs" c="dimmed">
                  {t('app:shifts.table.driver')}
                </Text>
                <Text fw={600} size="sm">
                  {shift.driver ? `${shift.driver.firstName} ${shift.driver.lastName}` : '-'}
                </Text>
              </Card>
              <Card withBorder padding="xs" radius="md">
                <Text size="xs" c="dimmed">
                  {t('app:shifts.table.car')}
                </Text>
                <Text fw={600} size="sm">
                  {shift.car
                    ? `${shift.car.licensePlate} (${shift.car.brand || ''} ${shift.car.model || ''})`
                    : '-'}
                </Text>
              </Card>
              <Card withBorder padding="xs" radius="md">
                <Text size="xs" c="dimmed">
                  {t('app:shifts.table.date')}
                </Text>
                <Text fw={500} size="sm">
                  {formatShiftDate(shift.shiftStart)} ({formatShiftTime(shift.shiftStart)} –{' '}
                  {formatShiftTime(shift.shiftEnd)})
                </Text>
              </Card>
              <Card withBorder padding="xs" radius="md">
                <Text size="xs" c="dimmed">
                  {t('app:shifts.table.km')}
                </Text>
                <Text fw={600} size="sm">
                  {shift.kilometersDriven !== undefined ? `${shift.kilometersDriven} km` : '-'} (
                  {shift.odometerStart} – {shift.odometerEnd})
                </Text>
              </Card>
            </SimpleGrid>

            <Group justify="space-between" align="center">
              <Badge color={statusColor} variant="light">
                {shift.status}
              </Badge>
              <Group gap="md">
                <Text size="xs" c="dimmed">
                  {t('app:shifts.table.total_revenue')}:{' '}
                  <Text span fw={700} c="blue">
                    {totalRevenue.toLocaleString('de-DE', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    €
                  </Text>
                </Text>
              </Group>
            </Group>

            {/* Revenues Table */}
            <Text fw={600} size="sm" mt="xs">
              {t('app:shifts.groups.revenues')}
            </Text>
            <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
              <Table verticalSpacing="xs" horizontalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t('app:shifts.table.category')}</Table.Th>
                    <Table.Th>{t('app:shifts.table.details')}</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>{t('app:shifts.table.revenue')}</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>
                      {t('app:shifts.table.driver_payout')}
                    </Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>
                      {t('app:shifts.table.company_share')}
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {(shift.revenues || []).map((rev, idx) => (
                    <Table.Tr key={rev.id || idx}>
                      <Table.Td>
                        <Badge variant="subtle" size="xs">
                          {rev.flatRateTypeName || rev.entryCategory}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {rev.entryCategory === 'FLAT_RATE'
                          ? `${rev.tripCount || 1} × ${
                              rev.pricePerTrip?.toLocaleString('de-DE', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) ?? '0,00'
                            } €`
                          : '-'}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right' }} fw={500}>
                        {rev.revenue !== undefined
                          ? `${rev.revenue.toLocaleString('de-DE', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} €`
                          : '-'}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right' }} c="teal">
                        {rev.driverRemuneration !== undefined
                          ? `${rev.driverRemuneration.toLocaleString('de-DE', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} €`
                          : '-'}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right' }} c="indigo">
                        {rev.companyRemuneration !== undefined
                          ? `${rev.companyRemuneration.toLocaleString('de-DE', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} €`
                          : '-'}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
                <Table.Tfoot>
                  <Table.Tr style={{ fontWeight: 600 }}>
                    <Table.Td colSpan={2}>{t('common:labels.sum', 'Summe')}</Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      {totalRevenue.toLocaleString('de-DE', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      €
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }} c="teal">
                      {totalDriverRemuneration.toLocaleString('de-DE', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      €
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }} c="indigo">
                      {totalCompanyRemuneration.toLocaleString('de-DE', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      €
                    </Table.Td>
                  </Table.Tr>
                </Table.Tfoot>
              </Table>
            </Paper>
          </Stack>
        )}
      </DataLoadingWrapper>
    </PageLayout>
  );
};

export default ShiftViewPage;
