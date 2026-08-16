import { Eye, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Badge, Group, Table } from '@mantine/core';
import { ShiftResponse } from '@/api/generated/model';
import { calculateShiftTotals, formatShiftDate } from '../utils/shift-calculations.utils';

import { ShiftActions } from './ShiftsTable';

interface ShiftTableRowProps {
  shift: ShiftResponse;
  actions: ShiftActions;
}

export const ShiftTableRow = ({ shift, actions }: ShiftTableRowProps) => {
  const { t } = useTranslation(['app', 'common']);

  const { totalRevenue, totalDriverRemuneration, totalCompanyRemuneration } =
    calculateShiftTotals(shift.revenues);

  const statusColor =
    shift.status === 'APPROVED' ? 'green' : shift.status === 'PENDING' ? 'yellow' : 'red';

  const dateFormatted = formatShiftDate(shift.shiftStart);

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
            onClick={() => actions.onViewDetails(shift)}
          >
            <Eye size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            aria-label={t('common:actions.delete')}
            onClick={() => actions.onDelete(shift)}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
