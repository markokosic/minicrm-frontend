import { Eye, Trash2, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge, Group, Table } from '@mantine/core';
import { ShiftResponse } from '@/api/generated/model';
import { calculateShiftTotals, formatShiftDate, formatShiftTime } from '../utils/shift-calculations.utils';
import { ActionMenu } from '@/components/ui/Menu/ActionMenu';
import { createFormatters } from '@/lib/utils';

import { ShiftActions } from './ShiftsTable';

interface ShiftTableRowProps {
  shift: ShiftResponse;
  actions: ShiftActions;
}

export const ShiftTableRow = ({ shift, actions }: ShiftTableRowProps) => {
  const { t, i18n } = useTranslation(['app', 'common']);
  const fmt = createFormatters(i18n.language);

  const { totalRevenue, totalDriverRemuneration, totalCompanyRemuneration } =
    calculateShiftTotals(shift.revenues);

  const statusColor =
    shift.status === 'APPROVED' ? 'green' : shift.status === 'PENDING' ? 'yellow' : 'red';

  const dateFormatted = formatShiftDate(shift.shiftStart);
  const timeFormatted = `${formatShiftTime(shift.shiftStart)} - ${formatShiftTime(shift.shiftEnd)}`;

  return (
    <Table.Tr
      onClick={() => actions.onViewDetails(shift)}
      style={{ cursor: 'pointer' }}
    >
      <Table.Td fw={500}>{dateFormatted}</Table.Td>
      <Table.Td>{timeFormatted}</Table.Td>
      <Table.Td>
        {shift.driver ? `${shift.driver.firstName} ${shift.driver.lastName}` : '-'}
      </Table.Td>
      <Table.Td>{shift.car?.licensePlate || '-'}</Table.Td>
      <Table.Td>
        {shift.car ? `${shift.car.brand || ''} ${shift.car.model || ''}`.trim() || '-' : '-'}
      </Table.Td>
      <Table.Td>
        {shift.kilometersDriven !== undefined ? `${shift.kilometersDriven} km` : '-'}
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }} fw={600}>
        {fmt.number(totalRevenue)} €
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }} c="teal">
        {fmt.number(totalDriverRemuneration)} €
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }} c="indigo">
        {fmt.number(totalCompanyRemuneration)} €
      </Table.Td>
      <Table.Td>
        <Badge color={statusColor} variant="light">
          {shift.status}
        </Badge>
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
        <Group gap="xs" justify="flex-end">
          <ActionMenu
            actions={[
              {
                label: t('app:shifts.actions.view_details', 'Details'),
                icon: Eye,
                onClick: () => actions.onViewDetails(shift),
              },
              {
                label: t('common:actions.edit', 'Bearbeiten'),
                icon: Edit2,
                onClick: () => actions.onEdit?.(shift),
              },
              {
                label: t('common:actions.delete', 'Löschen'),
                icon: Trash2,
                isDanger: true,
                onClick: () => actions.onDelete(shift),
              },
            ]}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
