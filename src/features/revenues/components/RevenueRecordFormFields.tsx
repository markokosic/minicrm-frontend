import { Alert, Grid, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ControlledDatePicker } from '@/components/ui/ControlledDatePicker/ControlledDatePicker';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { RemunerationModelType } from '@/features/remuneration';

export interface RevenueRecordFormFieldsProps {
  fieldPrefix?: string;
  driverOptions: { label: string; value: number }[];
  carOptions: { label: string; value: number }[];
  driverRemunerationConfigOptions: { label: string; value: string }[];
  selectedDriverRemunerationConfig?: RemunerationModelType | null;
  isWeeklyFixedRate?: boolean;
  isWeeklyPaymentToday?: boolean;
  weekdayName?: string | null;
  driverId?: number | null;
}

export const RevenueRecordFormFields = ({
  fieldPrefix = '',
  driverOptions,
  carOptions,
  driverRemunerationConfigOptions,
  selectedDriverRemunerationConfig,
  isWeeklyFixedRate,
  isWeeklyPaymentToday,
  weekdayName,
  driverId,
}: RevenueRecordFormFieldsProps) => {
  const { t } = useTranslation(['app', 'common']);

  const getFieldName = (name: string) => `${fieldPrefix}${name}`;

  return (
    <>
      <Grid >
        {/* --- ABSCHNITT 1: STAMMDATEN --- */}
        <Grid.Col span={12}>
          <Text
            fw={600}
            size="sm"
            c="dimmed"
          >
            {t('common:master_data')}
          </Text>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledCombobox
            name={getFieldName('driverId')}
            label={t('common:driver')}
            placeholder={t('common:select_driver')}
            data={driverOptions}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledCombobox
            name={getFieldName('driverRemunerationType')}
            label={t('app:revenues.fields.revenue_type')}
            placeholder={t('app:revenues.fields.select_revenue_type')}
            data={driverRemunerationConfigOptions}
            disabled={!driverId}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledCombobox
            name={getFieldName('carId')}
            label={t('common:car')}
            placeholder={t('common:select_car')}
            data={carOptions}
          />
        </Grid.Col>

        {/* --- ABSCHNITT 2: ZEITEN & KILOMETER --- */}
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
          <ControlledDatePicker
            name={getFieldName('date')}
            label={t('common:date')}
            dropdownType="modal"
            placeholder={t('common:pick_date')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledTextInput
            type="time"
            name={getFieldName('drivingStartTime')}
            label={t('app:revenues.fields.driven_from')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledTextInput
            type="time"
            name={getFieldName('drivingEndTime')}
            label={t('app:revenues.fields.driven_to')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledNumberInput
            min={0}
            suffix=" km"
            name={getFieldName('kilometersFrom')}
            label={t('app:revenues.fields.km_from')}
            placeholder="0"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledNumberInput
            min={0}
            suffix=" km"
            name={getFieldName('kilometersTo')}
            label={t('app:revenues.fields.km_to')}
            placeholder="0"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <ControlledNumberInput
            min={0}
            suffix=" km"
            name={getFieldName('kilometersDriven')}
            label={t('app:revenues.fields.kilometers_driven')}
            placeholder="0"
          />
        </Grid.Col>

        {/* --- ABSCHNITT 3: ABRECHNUNG & UMSATZ --- */}
        <Grid.Col
          span={12}
          mt="xs"
        >
          <Text
            fw={600}
            size="sm"
            c="dimmed"
          >
            {t('app:revenues.sections.billing')}
          </Text>
        </Grid.Col>

        {selectedDriverRemunerationConfig === RemunerationModelType.FLAT_RATE && (
          <>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <ControlledNumberInput
                min={0}
                name={getFieldName('tripCount')}
                label={t('app:revenues.fields.trip_count')}
                placeholder="0"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <ControlledNumberInput
                min={0}
                suffix=" €"
                name={getFieldName('pricePerTrip')}
                label={t('app:revenues.fields.price_per_trip')}
                placeholder="0"
              />
            </Grid.Col>
          </>
        )}

        <Grid.Col
          span={{
            base: 12,
            md:
              selectedDriverRemunerationConfig === RemunerationModelType.FLAT_RATE ||
              isWeeklyFixedRate
                ? 4
                : 12,
          }}
        >
          <ControlledNumberInput
            suffix=" €"
            name={getFieldName('revenue')}
            label={t('common:revenue')}
            decimalScale={2}
            fixedDecimalScale
            placeholder={t('common:enter_amount')}
          />
        </Grid.Col>

        {isWeeklyFixedRate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <ControlledNumberInput
              suffix=" €"
              name={getFieldName('companyRemuneration')}
              decimalScale={2}
              fixedDecimalScale
              label={t('app:revenues.fields.weekly_company_share')}
              placeholder={t('common:enter_amount')}
            />
          </Grid.Col>
        )}
      </Grid>

      {isWeeklyFixedRate && (
        <Alert
          mt="lg"
          variant="light"
          color={isWeeklyPaymentToday ? 'red' : 'blue'}
          title={
            isWeeklyPaymentToday
              ? t('app:revenues.fields.share_due_today')
              : t('app:revenues.fields.share_due_on', { day: weekdayName })
          }
        >
          {isWeeklyPaymentToday
            ? t('app:revenues.fields.weekly_share_hint')
            : t('app:revenues.fields.weekly_share_other_day_hint', { day: weekdayName })}
        </Alert>
      )}
    </>
  );
};
