import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Paper, Table, Text } from '@mantine/core';
import {
  getGetActiveFlatRateTypesQueryKey,
  getGetAllFlatRateTypesQueryKey,
  useDeactivateFlatRateType,
  useGetActiveFlatRateTypes,
} from '@/api/generated/endpoints/flat-rate-types/flat-rate-types';
import { FlatRateTypeResponse } from '@/api/generated/model';
import { useConfirmModal } from '@/common/hooks/useConfirmModal';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import queryClient from '@/lib/queryClient';
import { EditFlatRateModal } from './EditFlatRateModal';
import { FlatRateTableRow } from './FlatRateTableRow';
import { FlatRatesListSkeleton } from './FlatRatesListSkeleton';

export const FlatRatesList = () => {
  const { t } = useTranslation(['app', 'common']);
  const { confirm } = useConfirmModal();

  const [editingFlatRate, setEditingFlatRate] = useState<FlatRateTypeResponse | null>(null);

  const { data: response, isLoading, error } = useGetActiveFlatRateTypes();
  const flatRates = response?.data || [];
  const isEmpty = !isLoading && flatRates.length === 0;

  const { mutate: deactivateMutate } = useDeactivateFlatRateType({
    mutation: {
      onSuccess: () => {
        toast.success(t('app:flatrate.create.deactivate_success'));
        queryClient.invalidateQueries({ queryKey: getGetActiveFlatRateTypesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAllFlatRateTypesQueryKey() });
      },
      onError: (err: unknown) => {
        const apiErrorMessage =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          t('common:errors.unknown');
        toast.error(apiErrorMessage);
      },
    },
  });

  const handleDeactivate = (flatRate: FlatRateTypeResponse) => {
    if (!flatRate.id) return;
    confirm({
      title: t('app:flatrate.modals.deactivate_confirm.title'),
      children: (
        <Text size="sm">
          {t('app:flatrate.modals.deactivate_confirm.message')}
        </Text>
      ),
      labels: {
        confirm: t('app:flatrate.modals.deactivate_confirm.confirm'),
        cancel: t('common:actions.cancel'),
      },
      onConfirm: () => {
        deactivateMutate({ id: flatRate.id! });
      },
    });
  };

  return (
    <>
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error as Error | null}
        isEmpty={isEmpty}
        skeleton={<FlatRatesListSkeleton />}
        emptyFallback={
          <Paper withBorder p="xl" radius="md" ta="center">
            <Text c="dimmed">
              {t('app:flatrate.empty')}
            </Text>
          </Paper>
        }
      >
        <Paper withBorder radius="md" p="0" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('app:flatrate.table.id')}</Table.Th>
                <Table.Th>{t('app:flatrate.table.name')}</Table.Th>
                <Table.Th>{t('app:flatrate.table.default_price')}</Table.Th>
                <Table.Th>{t('app:flatrate.table.status')}</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>{t('app:flatrate.table.actions')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {flatRates.map((flatRate: FlatRateTypeResponse) => (
                <FlatRateTableRow
                  key={flatRate.id}
                  flatRate={flatRate}
                  onEdit={setEditingFlatRate}
                  onDeactivate={handleDeactivate}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </DataLoadingWrapper>

      <EditFlatRateModal
        flatRate={editingFlatRate}
        opened={!!editingFlatRate}
        onClose={() => setEditingFlatRate(null)}
      />
    </>
  );
};
