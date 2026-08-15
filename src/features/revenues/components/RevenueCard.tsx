import React from 'react';
import { ArrowRight, Calendar, Car, Clock, Edit2, Route, Trash, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { getTimeDuration } from '@/lib/utils';

import { DailyRevenueResponse } from '@/api/generated/model';

interface RevenueCardProps {
  item: DailyRevenueResponse & { licensePlate?: string; driverFirstName?: string; driverLastName?: string };
  onEdit: (item: DailyRevenueResponse) => void;
  onDelete: (item: DailyRevenueResponse) => void;
  getRemunerationLabel: (type: RemunerationModelType) => string;
}

export const RevenueCard = ({ item, onEdit, onDelete, getRemunerationLabel }: RevenueCardProps) => {
  const { t } = useTranslation(['app', 'common']);

  const carLabel = item.car?.licensePlate ?? item.licensePlate ?? t('common:car');

  const exactDuration = getTimeDuration(item.drivingStartTime ?? '', item.drivingEndTime ?? '');

  const driverName = item.driver
    ? `${item.driver.firstName} ${item.driver.lastName}`
    : item.driverFirstName && item.driverLastName
      ? `${item.driverFirstName} ${item.driverLastName}`
      : '';

  return (
    <Paper
      p="md"
      withBorder
      radius="md"
      shadow="xs"
      style={{ transition: 'box-shadow 150ms ease, border-color 150ms ease' }}
    >
      <Grid
        align="center"
      >
        {/* 1. COLUMN: Status, Name, Datum, Fahrzeug */}
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="xs">
            <Group gap="xs">
              <Badge
                variant="filled"
                color="indigo"
                size="xs"
                radius="xl"
              >
                {getRemunerationLabel((item.remunerationModelType as RemunerationModelType) ?? RemunerationModelType.FLAT_RATE)}
              </Badge>
            </Group>

            {driverName && (
              <Group gap="6px" wrap="nowrap">
                <User size={15} color="var(--mantine-color-blue-6)" style={{ flexShrink: 0 }} />
                <Text
                  fw={600}
                  size="sm"
                  truncate
                >
                  {driverName}
                </Text>
              </Group>
            )}

            <Group gap="xs" c="dimmed">
              <Group gap="4px" wrap="nowrap">
                <Calendar size={13} style={{ flexShrink: 0 }} />
                <Text size="xs">{item.date}</Text>
              </Group>

              <Text size="xs">•</Text>

              <Group gap="4px" wrap="nowrap">
                <Car size={13} style={{ flexShrink: 0 }} />
                <Text size="xs" fw={500}>{carLabel}</Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>

        {/* 2. COLUMN: KM-Stand */}
        <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
          <Stack gap="4px">
            <Group
              gap="4px"
              c="dimmed"
            >
              <Route size={14} />
              <Text
                size="xs"
                fw={500}
              >
                {t('app:revenues.fields.kilometers_driven')}
              </Text>
            </Group>

            <Text
              size="sm"
              fw={700}
            >
              {item.kilometersDriven} km
            </Text>

            <Text
              size="xs"
              c="dimmed"
            >
              {item.kilometersFrom} km{' '}
              <ArrowRight
                size={10}
                style={{ display: 'inline', verticalAlign: 'middle' }}
              />{' '}
              {item.kilometersTo} km
            </Text>
          </Stack>
        </Grid.Col>

        {/* 3. COLUMN: Arbeitszeit / Dauer */}
        <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
          <Stack gap="4px">
            <Group gap="4px" c="dimmed">
              <Clock
                size={14}
              />
              <Text
                size="xs"
                fw={500}
              >
                {t('common:duration', 'Dauer')}
              </Text>
            </Group>

            <Text
              size="sm"
              fw={700}
            >
              {exactDuration}
            </Text>

            <Text
              size="xs"
              c="dimmed"
            >
              {item.drivingStartTime
                ? item.drivingEndTime
                  ? `${item.drivingStartTime.substring(0, 5)} - ${item.drivingEndTime.substring(0, 5)}`
                  : item.drivingStartTime.substring(0, 5)
                : '-'}
            </Text>
          </Stack>
        </Grid.Col>

        {/* 4. COLUMN: Umsatz & Aufteilung (Firma / Fahrer) */}
        <Grid.Col span={{ base: 12, sm: 8, md: 4 }}>
          <Flex
            direction="column"
            align={{ base: 'flex-start', md: 'flex-end' }}
            gap="xs"
          >
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
              <Text
                size="xs"
                c="dimmed"
                fw={500}
                lts="0.5px"
              >
                {t('common:revenue', 'Umsatz').toUpperCase()}
              </Text>
              <Text
                fw={800}
                size="lg"
                c="teal.7"
              >
                {(item.revenue ?? 0).toFixed(2)} €
              </Text>
            </Box>

            <Stack
              gap="2px"
              w="100%"
              style={{ maxWidth: 220 }}
            >
              <Group
                gap="xs"
                justify="space-between"
                w="100%"
              >
                <Text
                  size="xs"
                  c="dimmed"
                >
                  {t('common:company', 'Firma')}:
                </Text>
                <Text
                  size="xs"
                  fw={600}
                  c="grape.6"
                >
                  {(item.companyRemuneration ?? 0).toFixed(2)} €
                </Text>
              </Group>

              <Group
                gap="xs"
                justify="space-between"
                w="100%"
              >
                <Text
                  size="xs"
                  c="dimmed"
                >
                  {t('common:driver', 'Fahrer')}:
                </Text>
                <Text
                  size="xs"
                  fw={600}
                  c="blue.6"
                >
                  {(item.driverRemuneration ?? 0).toFixed(2)} €
                </Text>
              </Group>
            </Stack>

          </Flex>
        </Grid.Col>

        {/* 5. COLUMN: Action Buttons (Edit & Delete) */}
        <Grid.Col span={{ base: 12, sm: 4, md: 1 }}>
          <Flex
            direction={{ base: 'row', md: 'column' }}
            gap="xs"
            justify={{ base: 'flex-end', md: 'center' }}
            align="center"
          >
            <Tooltip label={t('common:actions.edit', 'Bearbeiten')}>
              <ActionIcon
                variant="light"
                color="blue"
                onClick={() => onEdit(item)}
                size="md"
                radius="md"
              >
                <Edit2 size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t('common:actions.delete', 'Löschen')}>
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => onDelete(item)}
                size="md"
                radius="md"
              >
                <Trash size={16} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

