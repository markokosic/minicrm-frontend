import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import { Mail, Phone, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DriverResponse, DriverResponseStatus } from '@/api/generated/model';
import { useRemunerationLabels, RemunerationModelType } from '@/features/remuneration';

interface DriverCardProps {
  driver: DriverResponse;
}

export const DriverCard = ({ driver }: DriverCardProps) => {
  const { t } = useTranslation(['app', 'common']);
  const { getRemunerationLabel } = useRemunerationLabels();

  const isStatusActive = driver.status === DriverResponseStatus.ACTIVE;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      h="100%"
      w={{ base: '100%', sm: 320 }}
    >
      <Stack
        gap="xs"
        justify="space-between"
        style={{ height: '100%' }}
      >
        <Stack gap="xs">
          {/* Top Row: Status Badge */}
          {driver.status && (
            <Group justify="flex-start">
              <Badge
                variant="light"
                color={isStatusActive ? 'green' : 'gray'}
                size="xs"
              >
                {isStatusActive ? t('common:status.active', 'Aktiv') : driver.status}
              </Badge>
            </Group>
          )}

          {/* Driver Name */}
          <Group gap="xs" wrap="nowrap">
            <User size={18} color="var(--mantine-color-blue-6)" style={{ flexShrink: 0 }} />
            <Text fw={600} size="md" truncate style={{ flex: 1 }}>
              {driver.firstName} {driver.lastName}
            </Text>
          </Group>

          {/* Contact Info: Email & Phone */}
          <Stack gap="4px">
            {driver.email && (
              <Group gap="xs" c="dimmed" wrap="nowrap">
                <Mail size={14} style={{ flexShrink: 0 }} />
                <Text size="xs" truncate>
                  {driver.email}
                </Text>
              </Group>
            )}

            {driver.phone && (
              <Group gap="xs" c="dimmed" wrap="nowrap">
                <Phone size={14} style={{ flexShrink: 0 }} />
                <Text size="xs" truncate>
                  {driver.phone}
                </Text>
              </Group>
            )}
          </Stack>
        </Stack>

        {/* Remuneration Badges */}
        {driver.currentRemunerationConfigs && driver.currentRemunerationConfigs.length > 0 && (
          <Group gap="xs" mt="xs">
            {driver.currentRemunerationConfigs.map((config, idx) => {
              const type = config.remunerationModelType as RemunerationModelType;
              let label = getRemunerationLabel(type);
              if (
                type === RemunerationModelType.FLAT_RATE &&
                'flatRateTypeName' in config &&
                config.flatRateTypeName
              ) {
                label = `${label}: ${config.flatRateTypeName}`;
              }
              return (
                <Badge
                  key={idx}
                  variant="filled"
                  color="indigo"
                  size="xs"
                  radius="xl"
                >
                  {label}
                </Badge>
              );
            })}
          </Group>
        )}
      </Stack>
    </Card>
  );
};
