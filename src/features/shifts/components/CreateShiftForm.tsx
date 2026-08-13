import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Grid, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { ControlledDateTimePicker } from '@/components/ui/ControlledDatePicker/ControlledDateTimePicker';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';
import { Form } from '@/components/ui/Form';
import { useCarOptions } from '@/features/cars/hooks/useCarOptions';
import { useDriverOptions } from '@/features/drivers/hooks/useDriverOptions';
import { useCreateShiftForm } from '../hooks/useCreateShiftForm';
import { ShiftRevenueRow } from './ShiftRevenueRow';

export const CreateShiftForm = () => {
  const { t } = useTranslation(['app', 'common']);
  const { driverComboboxOptions, isLoading: isLoadingDrivers } = useDriverOptions();
  const { carComboboxOptions, isLoading: isLoadingCars } = useCarOptions();

  const {
    methods,
    selectedDriverId,
    revenueOptions,
    isLoadingRevenueOptions,
    fields,
    append,
    remove,
    onSubmit,
    isPending,
    calculatedKm,
    calculatedDuration,
    cancel,
  } = useCreateShiftForm();

  const handleAddRevenue = () => {
    if (revenueOptions.length > 0) {
      const firstOpt = revenueOptions[0];
      const optionKey = `${firstOpt.entryCategory}_${firstOpt.flatRateTypeId ?? 'none'}_0`;
      if (firstOpt.entryCategory === 'FLAT_RATE') {
        append({
          optionKey,
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: firstOpt.flatRateTypeId ?? null,
          tripCount: 1,
          pricePerTrip: firstOpt.defaultPrice ?? 0,
        });
      } else {
        append({
          optionKey,
          entryCategory: firstOpt.entryCategory,
          revenue: 0,
        });
      }
    } else {
      append({
        entryCategory: 'REGULAR',
        revenue: 0,
      });
    }
  };

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      formActions={
        <>
          <Button
            variant="outline"
            onClick={cancel}
          >
            {t('common:actions.cancel')}
          </Button>
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            {t('common:actions.save')}
          </Button>
        </>
      }
    >
      <Stack gap="xl">
        {/* --- ABSCHNITT 1: STAMMDATEN & ZEITEN --- */}
        <Paper
          withBorder
          p="md"
          radius="md"
        >
          <Grid gutter="md">
            <Grid.Col span={12}>
              <Text
                fw={600}
                size="sm"
                c="dimmed"
              >
                {t('common:master_data')}
              </Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <ControlledCombobox
                name="driverId"
                label={t('common:driver')}
                placeholder={t('common:select_driver')}
                data={driverComboboxOptions}
                disabled={isLoadingDrivers}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <ControlledCombobox
                name="carId"
                label={t('common:car')}
                placeholder={t('common:select_car')}
                data={carComboboxOptions}
                disabled={isLoadingCars}
              />
            </Grid.Col>

            <Grid.Col
              span={12}
              mt="xs"
            >
              <Text
                fw={600}
                size="sm"
                c="dimmed"
              >
                {t('app:revenues.sections.route_and_times')}
              </Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <ControlledDateTimePicker
                highlightToday
                name="shiftStart"
                label={t('app:shifts.fields.shift_start.label')}
                placeholder={t('app:shifts.fields.shift_start.placeholder')}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <ControlledDateTimePicker
                highlightToday
                name="shiftEnd"
                label={t('app:shifts.fields.shift_end.label')}
                placeholder={t('app:shifts.fields.shift_end.placeholder')}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label={t('app:shifts.fields.duration.label', 'Berechnete Schichtdauer')}
                value={calculatedDuration ? calculatedDuration.text : '-'}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <ControlledNumberInput
                name="odometerStart"
                label={t('app:shifts.fields.odometer_start.label')}
                placeholder="0"
                min={0}
                suffix=" km"
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <ControlledNumberInput
                name="odometerEnd"
                label={t('app:shifts.fields.odometer_end.label')}
                placeholder="0"
                min={0}
                suffix=" km"
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label={t('app:shifts.fields.kilometers_driven.label', 'Gefahrene Kilometer')}
                value={calculatedKm !== null ? `${calculatedKm} km` : '-'}
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* --- ABSCHNITT 2: UMSÄTZE (Dynamische Positiv-Liste) --- */}
        <Paper
          withBorder
          p="md"
          radius="md"
        >
          <Stack gap="md">
            <Group
              justify="space-between"
              align="center"
            >
              <Text
                fw={600}
                size="md"
              >
                {t('app:shifts.groups.revenues')}
              </Text>
              <Button
                size="xs"
                variant="light"
                leftSection={<Plus size={16} />}
                onClick={handleAddRevenue}
                disabled={!selectedDriverId || isLoadingRevenueOptions}
              >
                {t('app:shifts.actions.add_revenue')}
              </Button>
            </Group>

            {!selectedDriverId ? (
              <Alert
                color="blue"
                variant="light"
              >
                {t('app:shifts.select_driver_hint')}
              </Alert>
            ) : fields.length === 0 ? (
              <Alert
                color="gray"
                variant="light"
              >
                {t('app:shifts.no_revenues_hint')}
              </Alert>
            ) : (
              fields.map((field, idx) => (
                <ShiftRevenueRow
                  key={field.id}
                  index={idx}
                  revenueOptions={revenueOptions}
                  onRemove={remove}
                />
              ))
            )}
          </Stack>
        </Paper>
      </Stack>
    </Form>
  );
};
