import { useTranslation } from 'react-i18next';
import { Button, Card, Stack, Text } from '@mantine/core';
import { ControlledDateTimePicker } from '@/components/ui/ControlledDatePicker/ControlledDateTimePicker';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { FormSelect } from '@/components/ui/ControlledSelect/ControlledSelect';
import { Form } from '@/components/ui/Form';
import { useCarSelectOptions } from '@/features/cars/hooks/useCarOptions';
import { useAdminCreateShiftForm } from '../../hooks/admin/useAdminCreateShiftForm';

export const DriverShiftQuickForm = () => {
  const { t } = useTranslation(['app', 'common']);
  const { carOptions, isLoading: isLoadingCars } = useCarSelectOptions();

  const { methods, onSubmit, isPending, cancel } = useAdminCreateShiftForm();

  return (
    <Form
      methods={methods as any}
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
      <Stack gap="md">
        <Card
          withBorder
          radius="md"
          p="md"
        >
          <Text
            fw={600}
            size="sm"
            c="dimmed"
            mb="sm"
          >
            {t('common:master_data')}
          </Text>

          <Stack gap="md">
            <FormSelect
              withAsterisk
              isNumber
              name="carId"
              label={t('common:car')}
              placeholder={t('common:select_car')}
              data={carOptions}
              disabled={isLoadingCars}
            />

            <ControlledDateTimePicker
              withAsterisk
              highlightToday
              name="shiftStart"
              label={t('app:shifts.fields.shift_start.label')}
              placeholder={t('app:shifts.fields.shift_start.placeholder')}
            />

            <ControlledDateTimePicker
              withAsterisk
              highlightToday
              name="shiftEnd"
              label={t('app:shifts.fields.shift_end.label')}
              placeholder={t('app:shifts.fields.shift_end.placeholder')}
            />

            <ControlledNumberInput
              withAsterisk
              name="odometerStart"
              label={t('app:shifts.fields.odometer_start.label')}
              placeholder="0"
              min={0}
              suffix=" km"
            />

            <ControlledNumberInput
              withAsterisk
              name="odometerEnd"
              label={t('app:shifts.fields.odometer_end.label')}
              placeholder="0"
              min={0}
              suffix=" km"
            />
          </Stack>
        </Card>
      </Stack>
    </Form>
  );
};
