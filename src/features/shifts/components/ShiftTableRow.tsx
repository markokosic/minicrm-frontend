import { Eye, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Badge, Group, Table } from '@mantine/core';
import { ShiftResponse } from '@/api/generated/model';

interface ShiftTableRowProps {
  shift: ShiftResponse;
  onViewDetails: (shift: ShiftResponse) => void;
  onDelete: (shift: ShiftResponse) => void;
}

export const ShiftTableRow = ({ shift, onViewDetails, onDelete }: ShiftTableRowProps) => {
  const { t } = useTranslation(['app', 'common']);

  const totalRevenue = (shift.revenues || []).reduce((acc, r) => acc + (r.revenue || 0), 0);
  const totalDriverRemuneration = (shift.revenues || []).reduce(
    (acc, r) => acc + (r.driverRemuneration || 0),
    0
  );
  const totalCompanyRemuneration = (shift.revenues || []).reduce(
    (acc, r) => acc + (r.companyRemuneration || 0),
    0
  );

  const statusColor =
    shift.status === 'APPROVED' ? 'green' : shift.status === 'PENDING' ? 'yellow' : 'red';

  const dateFormatted = shift.shiftStart
    ? new Date(shift.shiftStart).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '-';

  return (
    <Table.Tr>
      <Table.Td fw={500}>{dateFormatted}</Table.Td>
      <Table.Td>
        {shift.driver ? `${shift.driver.firstName} ${shift.driver.lastName}` : '-'}
      </Table.Td>
      <Table.Td>{shift.car?.licensePlate || '-'}</Table.Td>
      <Table.Td>
        {shift.kilometersDriven !== undefined ? `${shift.kilometersDriven} km` : '-'}
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }} fw={600}>
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
      <Table.Td>
        <Badge color={statusColor} variant="light">
          {shift.status}
        </Badge>
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }}>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="blue"
            aria-label={t('app:shifts.actions.view_details')}
            onClick={() => onViewDetails(shift)}
          >
            <Eye size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            aria-label={t('common:actions.delete')}
            onClick={() => onDelete(shift)}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
