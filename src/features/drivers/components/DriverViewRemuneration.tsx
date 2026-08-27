import { Badge, Card, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { Coins, Percent, Receipt, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DriverResponse } from '@/api/generated/model';
import { RemunerationModelType, useRemunerationLabels } from '@/features/remuneration';

interface DriverViewRemunerationProps {
  driver: DriverResponse;
}

export const DriverViewRemuneration = ({ driver }: DriverViewRemunerationProps) => {
  const { t } = useTranslation(['app', 'common']);
  const { getRemunerationLabel } = useRemunerationLabels();

  const configs = driver.currentRemunerationConfigs || [];

  return (
    <Card
      withBorder
      radius="md"
      p="lg"
      shadow="sm"
    >
      <Group
        justify="space-between"
        align="center"
        mb="md"
      >
        <Text
          fw={600}
          size="xl"
        >
          {t('app:remuneration.driver_remuneration')}
        </Text>
      </Group>

      <Divider mb="lg" />

      {configs.length === 0 ? (
        <Text c="dimmed" size="sm">
          {t('app:dashboard.charts.empty.general')}
        </Text>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="xl"
        >
          {configs.map((config, index) => {
            const type = config.remunerationModelType as RemunerationModelType;
            const typeLabel = getRemunerationLabel(type);

            return (
              <Card
                key={index}
                withBorder
                radius="md"
                p="md"
                bg="var(--mantine-color-gray-0)"
              >
                <Stack gap="xs">
                  <Group justify="space-between" align="center">
                    <Badge
                      color="indigo"
                      variant="filled"
                      size="sm"
                    >
                      {typeLabel}
                    </Badge>
                  </Group>

                  {type === RemunerationModelType.PERCENTAGE_SHARE && (
                    <>
                      {'driverRevenueSharePercentage' in config && (
                        <Group gap="xs" c="dimmed">
                          <Percent size={16} />
                          <Text size="sm">
                            {t('common:form.driverRevenueSharePercentage.label')}:
                          </Text>
                          <Text fw={600} size="sm" c="dark">
                            {config.driverRevenueSharePercentage}%
                          </Text>
                        </Group>
                      )}
                      {'minDriverPayout' in config && config.minDriverPayout !== undefined && (
                        <Group gap="xs" c="dimmed">
                          <Coins size={16} />
                          <Text size="sm">
                            {t('common:form.minDriverPayout.label')}:
                          </Text>
                          <Text fw={600} size="sm" c="dark">
                            {config.minDriverPayout} €
                          </Text>
                        </Group>
                      )}
                    </>
                  )}

                  {type === RemunerationModelType.FLAT_RATE && (
                    <>
                      {'flatRateTypeName' in config && config.flatRateTypeName && (
                        <Group gap="xs" c="dimmed">
                          <Tag size={16} />
                          <Text size="sm">
                            {t('common:form.flatRateTypeId.label')}:
                          </Text>
                          <Text fw={600} size="sm" c="dark">
                            {config.flatRateTypeName}
                          </Text>
                        </Group>
                      )}
                      {'flatRateFee' in config && config.flatRateFee !== undefined && (
                        <Group gap="xs" c="dimmed">
                          <Coins size={16} />
                          <Text size="sm">
                            {t('common:form.flatRateFee.label')}:
                          </Text>
                          <Text fw={600} size="sm" c="dark">
                            {config.flatRateFee} €
                          </Text>
                        </Group>
                      )}
                    </>
                  )}

                  {type === RemunerationModelType.WEEKLY_FIXED_RATE && (
                    <>
                      {'weeklyFixedCompanySettlement' in config && (
                        <Group gap="xs" c="dimmed">
                          <Coins size={16} />
                          <Text size="sm">
                            {t('common:form.weeklyFixedCompanySettlement.label')}:
                          </Text>
                          <Text fw={600} size="sm" c="dark">
                            {config.weeklyFixedCompanySettlement} €
                          </Text>
                        </Group>
                      )}
                      {'settlementDay' in config && (
                        <Group gap="xs" c="dimmed">
                          <Receipt size={16} />
                          <Text size="sm">
                            {t('common:form.settlementDay.label')}:
                          </Text>
                          <Text fw={600} size="sm" c="dark">
                            {config.settlementDay}
                          </Text>
                        </Group>
                      )}
                    </>
                  )}
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </Card>
  );
};
