import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mantine/core';
import { CarResponse, DailyRevenueResponse, DriverResponse } from '@/api/generated/model';
import { Form } from '@/components/ui/Form';
import { CreateRevenueRecordRequest } from '../revenues-schemas';
import { useRevenueEditForm } from '../hooks/useRevenueEditForm';
import { RevenueRecordFormFields } from './RevenueRecordFormFields';

interface RevenueEditFormProps {
  revenue: DailyRevenueResponse;
  drivers: DriverResponse[];
  cars: CarResponse[];
  onCancel: () => void;
  onSuccess: () => void;
}

export const RevenueEditForm = ({
  revenue,
  drivers,
  cars,
  onCancel,
  onSuccess,
}: RevenueEditFormProps) => {
  const { t } = useTranslation(['app', 'common']);
  const {
    methods,
    onSubmit,
    isPending,
    carOptions,
    driverOptions,
    driverRemunerationConfigOptions,
    weekdayName,
    isWeeklyPaymentToday,
    isWeeklyFixedRate,
    driverId,
    selectedDriverRemunerationConfig,
  } = useRevenueEditForm({ revenue, drivers, cars, onSuccess });

  const formIsValid = methods.formState.isValid;

  return (
    <Box p="xs">
      <Form<CreateRevenueRecordRequest>
        methods={methods}
        onSubmit={onSubmit}
        formActions={
          <>
            <Button
              variant="outline"
              onClick={onCancel}
            >
              {t('common:actions.cancel')}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={!formIsValid || isPending}
            >
              {t('common:actions.save')}
            </Button>
          </>
        }
      >
        <RevenueRecordFormFields
          driverOptions={driverOptions}
          carOptions={carOptions}
          driverRemunerationConfigOptions={driverRemunerationConfigOptions}
          selectedDriverRemunerationConfig={selectedDriverRemunerationConfig}
          isWeeklyFixedRate={isWeeklyFixedRate}
          isWeeklyPaymentToday={isWeeklyPaymentToday}
          weekdayName={weekdayName}
          driverId={driverId}
        />
      </Form>
    </Box>
  );
};
