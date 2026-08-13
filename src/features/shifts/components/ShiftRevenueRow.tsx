import { Trash2 } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Badge, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { DriverRevenueOption } from '@/api/generated/model';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ComboboxOption, ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';

interface ShiftRevenueRowProps {
  index: number;
  revenueOptions: DriverRevenueOption[];
  onRemove: (index: number) => void;
}

export const ShiftRevenueRow = ({
  index,
  revenueOptions,
  onRemove,
}: ShiftRevenueRowProps) => {
  const { t } = useTranslation(['app', 'common']);
  const { setValue, control } = useFormContext();

  const fieldPrefix = `revenues.${index}`;

  const entryCategory = useWatch({ control, name: `${fieldPrefix}.entryCategory` });
  const tripCount = useWatch({ control, name: `${fieldPrefix}.tripCount` }) || 0;
  const pricePerTrip = useWatch({ control, name: `${fieldPrefix}.pricePerTrip` }) || 0;

  const comboboxData: ComboboxOption<string>[] = revenueOptions.map((opt, idx) => ({
    label: opt.label || '',
    value: `${opt.entryCategory}_${opt.flatRateTypeId ?? 'none'}_${idx}`,
  }));

  const handleOptionChange = (selectedKey: string) => {
    const matched = revenueOptions.find(
      (opt, idx) => `${opt.entryCategory}_${opt.flatRateTypeId ?? 'none'}_${idx}` === selectedKey
    );
    if (!matched) return;

    setValue(`${fieldPrefix}.optionKey`, selectedKey);
    setValue(`${fieldPrefix}.entryCategory`, matched.entryCategory);

    if (matched.entryCategory === 'FLAT_RATE') {
      setValue(`${fieldPrefix}.flatRateTypeId`, matched.flatRateTypeId ?? null);
      setValue(`${fieldPrefix}.tripCount`, 1);
      setValue(`${fieldPrefix}.pricePerTrip`, matched.defaultPrice ?? 0);
      setValue(`${fieldPrefix}.revenue`, undefined);
    } else {
      setValue(`${fieldPrefix}.flatRateTypeId`, null);
      setValue(`${fieldPrefix}.tripCount`, undefined);
      setValue(`${fieldPrefix}.pricePerTrip`, undefined);
      setValue(`${fieldPrefix}.revenue`, 0);
    }
  };

  const calculatedTotal = (Number(tripCount) || 0) * (Number(pricePerTrip) || 0);

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between" align="flex-start" mb="xs">
        <Text fw={600} size="sm">
          {t('app:shifts.revenue_entry')} #{index + 1}
        </Text>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => onRemove(index)}
          aria-label={t('common:actions.delete')}
        >
          <Trash2 size={16} />
        </ActionIcon>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: entryCategory === 'FLAT_RATE' ? 3 : 2 }} spacing="md" align="flex-end">
        <ControlledCombobox
          name={`${fieldPrefix}.optionKey`}
          label={t('app:shifts.fields.revenue_type.label')}
          placeholder={t('app:shifts.fields.revenue_type.placeholder')}
          data={comboboxData}
          onChange={(val) => {
            if (typeof val === 'string') {
              handleOptionChange(val);
            }
          }}
        />

        {entryCategory === 'FLAT_RATE' ? (
          <>
            <ControlledNumberInput
              name={`${fieldPrefix}.tripCount`}
              label={t('app:shifts.fields.trip_count.label')}
              placeholder="1"
              min={1}
            />
            <ControlledNumberInput
              name={`${fieldPrefix}.pricePerTrip`}
              label={t('app:shifts.fields.price_per_trip.label')}
              placeholder="0,00"
              min={0}
              decimalScale={2}
              suffix=" €"
            />
          </>
        ) : (
          <ControlledNumberInput
            name={`${fieldPrefix}.revenue`}
            label={t('app:shifts.fields.revenue.label')}
            placeholder="0,00"
            min={0}
            decimalScale={2}
            suffix=" €"
          />
        )}
      </SimpleGrid>

      {entryCategory === 'FLAT_RATE' && (
        <Group justify="flex-end" mt="xs">
          <Badge variant="light" color="blue" size="md">
            {t('app:shifts.calculation_preview')}: {tripCount} ×{' '}
            {pricePerTrip.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € ={' '}
            {calculatedTotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </Badge>
        </Group>
      )}
    </Paper>
  );
};
