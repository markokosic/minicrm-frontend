import { Paper, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { FlatRateTypeResponse } from '@/api/generated/model';
import { FlatRateTableRow } from './FlatRateTableRow';

interface FlatRateActions {
  onEdit: (flatRate: FlatRateTypeResponse) => void;
  onDeactivate: (flatRate: FlatRateTypeResponse) => void;
}

interface FlatRatesTableProps {
  flatRates: FlatRateTypeResponse[];
  actions: FlatRateActions;
}

export const FlatRatesTable = ({
  flatRates,
  actions,
}: FlatRatesTableProps) => {
  const { t } = useTranslation(['app', 'common']);

  return (
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
          {flatRates.map((flatRate) => (
            <FlatRateTableRow
              key={flatRate.id}
              flatRate={flatRate}
              onEdit={actions.onEdit}
              onDeactivate={actions.onDeactivate}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};
