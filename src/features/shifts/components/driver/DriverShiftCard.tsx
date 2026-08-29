import { CalendarDays, Car, Clock, Route } from 'lucide-react';
import { Card, Group, Stack, Text } from '@mantine/core';
import { ShiftResponse } from '@/api/generated/model';
import { calculateShiftDuration, formatShiftDate, formatShiftTime } from '../../domain/shift-calculations';
import { ShiftStatusBadge } from '../shared/ShiftStatusBadge';

interface DriverShiftCardProps {
  shift: ShiftResponse;
  onClick?: () => void;
}

export const DriverShiftCard = ({ shift, onClick }: DriverShiftCardProps) => {
  const dateFormatted = formatShiftDate(shift.shiftStart);
  const timeFormatted = `${formatShiftTime(shift.shiftStart)} - ${formatShiftTime(shift.shiftEnd)}`;
  const shiftDuration = calculateShiftDuration(shift.shiftStart, shift.shiftEnd);

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Group justify="space-between" align="center" mb="xs">
        <Group gap="xs">
          <CalendarDays size={18} />
          <Text fw={600} size="sm">
            {dateFormatted}
          </Text>
        </Group>
        <ShiftStatusBadge status={shift.status} />
      </Group>

      <Stack gap="xs">
        <Group gap="xs" c="dimmed">
          <Clock size={16} />
          <Text size="sm">
            {timeFormatted} {shiftDuration ? `(${shiftDuration.hours}h ${shiftDuration.minutes}m)` : ''}
          </Text>
        </Group>

        {shift.car && (
          <Group gap="xs" c="dimmed">
            <Car size={16} />
            <Text size="sm">
              {shift.car.licensePlate} {shift.car.brand ? `• ${shift.car.brand} ${shift.car.model || ''}` : ''}
            </Text>
          </Group>
        )}

        {shift.kilometersDriven !== undefined && shift.kilometersDriven !== null && (
          <Group gap="xs" c="dimmed">
            <Route size={16} />
            <Text size="sm">
              {shift.kilometersDriven} km
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
};
