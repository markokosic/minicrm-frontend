import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Badge, Group, Table } from '@mantine/core';
import { FlatRateTypeResponse } from '@/api/generated/model';

interface FlatRateTableRowProps {
  flatRate: FlatRateTypeResponse;
  onEdit: (flatRate: FlatRateTypeResponse) => void;
  onDeactivate: (flatRate: FlatRateTypeResponse) => void;
}

export const FlatRateTableRow = ({
  flatRate,
  onEdit,
  onDeactivate,
}: FlatRateTableRowProps) => {
  const { t } = useTranslation(['app', 'common']);

  return (
    <Table.Tr>
      <Table.Td>#{flatRate.id}</Table.Td>
      <Table.Td fw={500}>{flatRate.name}</Table.Td>
      <Table.Td>
        {flatRate.defaultPrice !== undefined && flatRate.defaultPrice !== null
          ? `${flatRate.defaultPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
          : '-'}
      </Table.Td>
      <Table.Td>
        <Badge color={flatRate.active ? 'green' : 'gray'} variant="light">
          {flatRate.active
            ? t('app:flatrate.status.active')
            : t('app:flatrate.status.inactive')}
        </Badge>
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }}>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="blue"
            aria-label={t('common:actions.edit')}
            onClick={() => onEdit(flatRate)}
          >
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            aria-label={t('app:flatrate.actions.deactivate')}
            onClick={() => onDeactivate(flatRate)}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
