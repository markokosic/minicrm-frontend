import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mantine/core';
import { Form } from '@/shared/components/forms/Form';
import { useCarSelectOptions } from '@/features/cars/hooks/useCarOptions';
import { useDriverSelectOptions } from '@/features/drivers/hooks/useDriverOptions';
import { useAdminCreateShiftForm } from '@/features/shifts/hooks/admin/useAdminCreateShiftForm';
import { ShiftMasterDataSection } from './ShiftMasterDataSection';
import { ShiftRevenuesSection } from './ShiftRevenuesSection';

export const AdminShiftForm = () => {
  const { t } = useTranslation(['app', 'common']);
  const { driverOptions, isLoading: isLoadingDrivers } = useDriverSelectOptions();
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
