import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mantine/core';
import { Form } from '@/components/ui/Form';
import { useCarSelectOptions } from '@/features/cars/hooks/useCarOptions';
import { useDriverSelectOptions } from '@/features/drivers/hooks/useDriverOptions';
import { useCreateShiftForm } from '../hooks/useCreateShiftForm';
import { ShiftMasterDataSection } from './ShiftMasterDataSection';
import { ShiftRevenuesSection } from './ShiftRevenuesSection';

export const CreateShiftForm = () => {
  const { t } = useTranslation(['app', 'common']);
  const { driverOptions, isLoading: isLoadingDrivers } = useDriverSelectOptions();
  const { carOptions, isLoading: isLoadingCars } = useCarSelectOptions();

  const {
    methods,
    onSubmit,
    isPending,
    cancel,
  } = useCreateShiftForm();

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
        />

        <ShiftRevenuesSection />
      </Stack>
    </Form>
  );
};
