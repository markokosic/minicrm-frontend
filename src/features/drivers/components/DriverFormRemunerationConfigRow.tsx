import { useMemo } from 'react';
import { Trash } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Box, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { useGetActiveFlatRateTypes } from '@/api/generated/endpoints/flat-rate-types/flat-rate-types';
import { DAYS_OF_THE_WEEK } from '@/common/constants';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ComboboxOption, ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';
import {
  REMUNERATION_FORM_FIELDS,
  RemunerationModelType,
  useRemunerationLabels,
} from '@/features/remuneration';

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

  const { data: flatRateTypesResponse } = useGetActiveFlatRateTypes();
  const activeFlatRateTypes = flatRateTypesResponse?.data || [];

  const namePrefix = `remunerationConfigs.${index}`;

  const selectedType = useWatch({
    name: `${namePrefix}.remunerationModelType`,
  });

  const currentFlatRateTypeId = useWatch({
    name: `${namePrefix}.flatRateTypeId`,
  });

  const dayOptions = DAYS_OF_THE_WEEK.map((day) => ({
    value: day.value,
    label: t(day.label),
  }));

  const flatRateTypeOptions = useMemo(() => {
    const options: ComboboxOption<number | null>[] = [
      {
        label: t('common:form.flatRateTypeId.all_flat_rates'),
        value: null,
      },
    ];

    activeFlatRateTypes.forEach((fr) => {
      if (fr.id !== undefined && fr.id !== null) {
        options.push({
          label: fr.name || '',
          value: fr.id,
        });
      }
    });

    if (
      currentFlatRateTypeId !== undefined &&
      currentFlatRateTypeId !== null &&
      !options.some((opt) => opt.value === currentFlatRateTypeId)
    ) {
      options.push({
        label: `ID #${currentFlatRateTypeId}`,
        value: currentFlatRateTypeId,
      });
    }

    return options;
  }, [activeFlatRateTypes, currentFlatRateTypeId, t]);

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
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <ControlledNumberInput
              min={0}
              suffix="€"
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.flatRate.flatRateFee.name}`}
              label={t(REMUNERATION_FORM_FIELDS.flatRate.flatRateFee.labelKey)}
              placeholder={t(REMUNERATION_FORM_FIELDS.flatRate.flatRateFee.placeholderKey)}
            />
            <ControlledCombobox
              name={`${namePrefix}.${REMUNERATION_FORM_FIELDS.flatRate.flatRateTypeId.name}`}
              label={t(REMUNERATION_FORM_FIELDS.flatRate.flatRateTypeId.labelKey)}
              placeholder={t(REMUNERATION_FORM_FIELDS.flatRate.flatRateTypeId.placeholderKey)}
              data={flatRateTypeOptions}
            />
          </SimpleGrid>
        )}
      </Stack>
    </Box>
  );
};
