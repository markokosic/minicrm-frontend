import React from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useGetDriverRevenueOptions } from '@/api/generated/endpoints/drivers/drivers';
import { ShiftRevenueRow } from './ShiftRevenueRow';
import { DriverRevenueOptionEntryCategory } from '@/api/generated/model';
import { getRevenueOptionKey } from '../utils/shift-calculations.utils';

export const ShiftRevenuesSection = () => {
  const { t } = useTranslation(['app', 'common']);
  
  const { control } = useFormContext();
  const selectedDriverIdRaw = useWatch({
    control,
    name: 'driverId',
  });
  const selectedDriverId =
    selectedDriverIdRaw !== undefined && selectedDriverIdRaw !== null && selectedDriverIdRaw !== ''
      ? Number(selectedDriverIdRaw)
      : undefined;
  
  const { data: revenueOptionsResponse, isLoading: isLoadingRevenueOptions } =
    useGetDriverRevenueOptions(selectedDriverId as number, {
      query: {
        enabled: typeof selectedDriverId === 'number' && !isNaN(selectedDriverId) && selectedDriverId > 0,
      },
    });

  const revenueOptions = revenueOptionsResponse?.data || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'revenues',
  });

  const previousDriverIdRef = React.useRef(selectedDriverId);

  React.useEffect(() => {
    if (
      previousDriverIdRef.current !== undefined &&
      previousDriverIdRef.current !== selectedDriverId
    ) {
      remove();
    }
    previousDriverIdRef.current = selectedDriverId;
  }, [selectedDriverId, remove]);

  const handleAddRevenue = () => {
    // 1. Fallback: Keine Umsatz-Optionen verfügbar
    if (!revenueOptions.length) {
      return append({
        optionKey: 'REGULAR',
        entryCategory: DriverRevenueOptionEntryCategory.REGULAR,
        revenue: 0,
      });
    }

    const firstOpt = revenueOptions[0];
    const optionKey = getRevenueOptionKey(firstOpt.entryCategory, firstOpt.flatRateTypeId);
    const baseRevenue = { optionKey, entryCategory: firstOpt.entryCategory };

    if (firstOpt.entryCategory === DriverRevenueOptionEntryCategory.FLAT_RATE) {
      return append({
        ...baseRevenue,
        flatRateTypeId: firstOpt.flatRateTypeId ?? null,
        tripCount: 0,
        pricePerTrip: firstOpt.defaultPrice ?? 0,
      });
    }

    // 3. Normaler Umsatz (REGULAR / WEEKLY) anfügen
    append({
      ...baseRevenue,
      revenue: 0,
    });
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fw={600} size="md">
            {t('app:shifts.groups.revenues')}
          </Text>
          <Button
            size="xs"
            variant="light"
            leftSection={<Plus size={16} />}
            onClick={handleAddRevenue}
            disabled={!selectedDriverId || isLoadingRevenueOptions || revenueOptions.length === 0}
          >
            {t('app:shifts.actions.add_revenue')}
          </Button>
        </Group>

        {!selectedDriverId ? (
          <Alert color="blue" variant="light">
            {t('app:shifts.select_driver_hint')}
          </Alert>
        ) : revenueOptions.length === 0 && !isLoadingRevenueOptions ? (
          <Alert color="red" variant="light">
            {t('app:shifts.no_remuneration_config_hint', 'Fahrer hat keine Vergütungskonfiguration eingestellt')}
          </Alert>
        ) : fields.length === 0 ? (
          <Alert color="gray" variant="light">
            {t('app:shifts.no_revenues_hint')}
          </Alert>
        ) : (
          fields.map((field, index) => (
            <ShiftRevenueRow
              key={field.id}
              index={index}
              revenueOptions={revenueOptions}
              onRemove={remove}
            />
          ))
        )}
      </Stack>
    </Paper>
  );
};
