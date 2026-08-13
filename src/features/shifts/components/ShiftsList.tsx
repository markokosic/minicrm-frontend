import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Group, Pagination, Paper, Table, Text } from '@mantine/core';
import {
  getGetAllShiftsQueryKey,
  useDeleteShift,
  useGetAllShifts,
} from '@/api/generated/endpoints/shifts/shifts';
import { ShiftResponse } from '@/api/generated/model';
import { useConfirmModal } from '@/common/hooks/useConfirmModal';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import queryClient from '@/lib/queryClient';
import { ShiftDetailModal } from './ShiftDetailModal';
import { ShiftTableRow } from './ShiftTableRow';
import { ShiftsListSkeleton } from './ShiftsListSkeleton';

export const ShiftsList = () => {
  const { t } = useTranslation(['app', 'common']);
  const { confirm } = useConfirmModal();

  const [page, setPage] = useState(1);
  const [selectedShift, setSelectedShift] = useState<ShiftResponse | null>(null);

  const { data: response, isLoading, error } = useGetAllShifts({
    page,
    size: 15,
  });

  const pageData = response?.data;
  const shifts = pageData?.content || [];
  const totalPages = pageData?.totalPages || 1;
  const isEmpty = !isLoading && shifts.length === 0;

  const { mutate: deleteMutate } = useDeleteShift({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:shifts.notifications.delete.success'));
        queryClient.invalidateQueries({ queryKey: getGetAllShiftsQueryKey() });
      },
      onError: (err: unknown) => {
        const apiErrorMessage =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('errors:common.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const handleDelete = (shift: ShiftResponse) => {
    if (!shift.id) return;
    confirm({
      title: t('app:shifts.modals.delete_confirm.title'),
      children: (
        <Text size="sm">
          {t('app:shifts.modals.delete_confirm.message')}
        </Text>
      ),
      labels: {
        confirm: t('common:actions.delete'),
        cancel: t('common:actions.cancel'),
      },
      onConfirm: () => {
        deleteMutate({ id: shift.id! });
      },
    });
  };

  return (
    <>
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error as Error | null}
        isEmpty={isEmpty}
        skeleton={<ShiftsListSkeleton />}
        emptyFallback={
          <Paper withBorder p="xl" radius="md" ta="center">
            <Text c="dimmed">{t('app:shifts.empty')}</Text>
          </Paper>
        }
      >
        <Paper withBorder radius="md" p="0" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('app:shifts.table.date')}</Table.Th>
                <Table.Th>{t('app:shifts.table.driver')}</Table.Th>
                <Table.Th>{t('app:shifts.table.car')}</Table.Th>
                <Table.Th>{t('app:shifts.table.km')}</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>{t('app:shifts.table.total_revenue')}</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>{t('app:shifts.table.driver_payout')}</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>{t('app:shifts.table.company_share')}</Table.Th>
                <Table.Th>{t('app:shifts.table.status')}</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>{t('app:shifts.table.actions')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {shifts.map((shift: ShiftResponse) => (
                <ShiftTableRow
                  key={shift.id}
                  shift={shift}
                  onViewDetails={setSelectedShift}
                  onDelete={handleDelete}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {totalPages > 1 && (
          <Group justify="center" mt="lg">
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Group>
        )}
      </DataLoadingWrapper>

      <ShiftDetailModal
        shift={selectedShift}
        opened={!!selectedShift}
        onClose={() => setSelectedShift(null)}
      />
    </>
  );
};
