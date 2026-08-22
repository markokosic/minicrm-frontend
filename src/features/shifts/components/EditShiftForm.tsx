import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mantine/core';
import { Form } from '@/components/ui/Form';
import { useCarSelectOptions } from '@/features/cars/hooks/useCarOptions';
import { useDriverSelectOptions } from '@/features/drivers/hooks/useDriverOptions';
import { ShiftResponse } from '@/api/generated/model';
import { useUpdateShiftForm } from '../hooks/useUpdateShiftForm';
import { ShiftMasterDataSection } from './ShiftMasterDataSection';
import { ShiftRevenuesSection } from './ShiftRevenuesSection';

interface EditShiftFormProps {
  shift: ShiftResponse;
}

export const EditShiftForm = ({ shift }: EditShiftFormProps) => {
  const { t } = useTranslation(['app', 'common']);
  const { driverOptions, isLoading: isLoadingDrivers } = useDriverSelectOptions();
  const { carOptions, isLoading: isLoadingCars } = useCarSelectOptions();

  const { methods, onSubmit, isPending, cancel } = useUpdateShiftForm(shift);

  return (
    <Form
      methods={methods as any}
      onSubmit={onSubmit}
      formActions={
        <>
          <Button variant="outline" onClick={cancel}>
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
        <ShiftMasterDataSection
          driverOptions={driverOptions}
          carOptions={carOptions}
          isLoadingDrivers={isLoadingDrivers}
          isLoadingCars={isLoadingCars}
          isEdit
        />

        <ShiftRevenuesSection />
      </Stack>
    </Form>
  );
};
