import { Trash } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Box, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { DAYS_OF_THE_WEEK } from '@/common/constants';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';
import { REMUNERATION_FORM_FIELDS } from '@/features/remuneration/config/remuneration-form-fields';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { useRemunerationLabels } from '@/features/remuneration/hooks/useRemunerationLabels';

type DriverFormRemunerationConfigRowType = {
  index: number;
  remove: (index: number) => void;
};

export const DriverFormRemunerationConfigRow = ({
  index,
  remove,
}: DriverFormRemunerationConfigRowType) => {
  const { t } = useTranslation(['common', 'app']);
  const { remunerationTypeOptions: remunerationTypes } = useRemunerationLabels();

  const selectedType = useWatch({
    name: `remunerationConfigs.${index}.remunerationModelType`,
  });

  const dayOptions = DAYS_OF_THE_WEEK.map((day) => ({
    value: day.value,
    label: t(day.label),
  }));

  const namePrefix = `remunerationConfigs.${index}`;

  return (
    <Box
      p="md"
      style={{
        backgroundColor: 'var(--mantine-color-default)',
        border: '1px solid var(--mantine-color-default-border)',
        borderRadius: 'var(--mantine-radius-md)',
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600} size="sm">
            {t('app:remuneration.driver_remuneration')} #{index + 1}
          </Text>
          <ActionIcon
            color="red"
            variant="subtle"
            size="sm"
            onClick={() => remove(index)}
          >
            <Trash size={16} />
          </ActionIcon>
        </Group>

        <ControlledCombobox
          name={`${namePrefix}.remunerationModelType`}
          label={t(REMUNERATION_FORM_FIELDS.type.labelKey)}
          placeholder={t(REMUNERATION_FORM_FIELDS.type.placeholderKey)}
          data={remunerationTypes}
        />

        {selectedType === RemunerationModelType.PERCENTAGE_SHARE && (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <ControlledNumberInput
              min={0}
              suffix="€"
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.name}`}
              label={t(REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.labelKey)}
              placeholder={t(
                REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.placeholderKey
              )}
            />
            <ControlledNumberInput
              min={0}
              max={100}
              clampBehavior="strict"
              suffix="%"
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.percentageShare.driverRevenueSharePercentage.name}`}
              label={t(
                REMUNERATION_FORM_FIELDS.percentageShare.driverRevenueSharePercentage.labelKey
              )}
              placeholder={t(
                REMUNERATION_FORM_FIELDS.percentageShare.driverRevenueSharePercentage.placeholderKey
              )}
            />
          </SimpleGrid>
        )}

        {selectedType === RemunerationModelType.WEEKLY_FIXED_RATE && (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <ControlledNumberInput
              min={0}
              suffix="€"
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.weeklyFixedRate.weeklyFixedCompanySettlement.name}`}
              label={t(
                REMUNERATION_FORM_FIELDS.weeklyFixedRate.weeklyFixedCompanySettlement.labelKey
              )}
              placeholder={t(
                REMUNERATION_FORM_FIELDS.weeklyFixedRate.weeklyFixedCompanySettlement.placeholderKey
              )}
            />
            <ControlledCombobox
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.weeklyFixedRate.settlementDay.name}`}
              label={t(REMUNERATION_FORM_FIELDS.weeklyFixedRate.settlementDay.labelKey)}
              placeholder={t(REMUNERATION_FORM_FIELDS.weeklyFixedRate.settlementDay.placeholderKey)}
              data={dayOptions}
            />
          </SimpleGrid>
        )}

        {selectedType === RemunerationModelType.FLAT_RATE && (
          <SimpleGrid cols={1} spacing="md">
            <ControlledNumberInput
              min={0}
              suffix="€"
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.flatRate.flatRateFee.name}`}
              label={t(REMUNERATION_FORM_FIELDS.flatRate.flatRateFee.labelKey)}
              placeholder={t(REMUNERATION_FORM_FIELDS.flatRate.flatRateFee.placeholderKey)}
            />
          </SimpleGrid>
        )}
      </Stack>
    </Box>
  );
};
