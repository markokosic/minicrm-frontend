import { Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Fieldset, Group, Text } from '@mantine/core';
import { DriverResponse as Driver } from '@/api/generated/model';
import { useCreateRevenueRecordRow } from '../hooks/useCreateRevenueRecordRow';
import { RevenueRecordFormFields } from './RevenueRecordFormFields';

interface CreateRevenueRecordRowProps {
  index: number;
  remove: (index: number) => void;
  carOptions: { label: string; value: number }[];
  driverOptions: { label: string; value: number }[];
  drivers: Driver[];
}

export const CreateRevenueRecordRow = ({
  index,
  remove,
  carOptions,
  driverOptions,
  drivers,
}: CreateRevenueRecordRowProps) => {
  const { t } = useTranslation(['app', 'common']);
  const {
    driverRemunerationConfigOptions,
    weekdayName,
    isWeeklyPaymentToday,
    isWeeklyFixedRate,
    driverId,
    selectedDriverRemunerationConfig,
  } = useCreateRevenueRecordRow({ index, drivers });

  return (
    <Fieldset
      legend={
        <Group
          justify="space-between"
          style={{ width: '100%' }}
        >
          <Text
            fw={700}
            size="lg"
            c="black"
          >
            {t('app:revenues.bulk.row_title', { index: index + 1 })}
          </Text>
          <ActionIcon
            color="red"
            variant="light"
            size="lg"
            onClick={() => remove(index)}
          >
            <Trash size={18} />
          </ActionIcon>
        </Group>
      }
      radius="md"
    >
      <RevenueRecordFormFields
        fieldPrefix={`dailyRevenueRecords.${index}.`}
        driverOptions={driverOptions}
        carOptions={carOptions}
        driverRemunerationConfigOptions={driverRemunerationConfigOptions}
        selectedDriverRemunerationConfig={selectedDriverRemunerationConfig}
        isWeeklyFixedRate={isWeeklyFixedRate}
        isWeeklyPaymentToday={isWeeklyPaymentToday}
        weekdayName={weekdayName}
        driverId={driverId}
      />
    </Fieldset>
  );
};
