import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DAYS_OF_THE_WEEK } from '@/common/constants';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { FieldGroup } from '@/components/ui/Form';
import { REMUNERATION_FORM_FIELDS } from '@/features/remuneration/config/remuneration-form-fields';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { DRIVERS_FORM_FIELDS } from '../config/drivers-form-fields';

export const DriverForm = () => {
  const { t } = useTranslation();

  const dayOptions = DAYS_OF_THE_WEEK.map((day) => ({
    value: day.value,
    label: t(day.label),
  }));

  const remunerationTypes = [
    {
      label: t('remuneration:type.percentageShare'),
      value: RemunerationModelType.PERCENTAGE_SHARE,
    },
    {
      label: t('remuneration:type.weeklyFixedRate'),
      value: RemunerationModelType.WEEKLY_FIXED_RATE,
    },
  ];

  // useWatch uses the FormProvider context
  const selectedType = useWatch({
    name: `remunerationConfig.${REMUNERATION_FORM_FIELDS.type.name}`,
  });

  return (
    <>
      <FieldGroup
        columnConfig={{ desktop: { columns: 2 }, mobile: { columns: 1 } }}
        groupNameKey="form:groups.general_information"
      >
        <ControlledTextInput
          name={DRIVERS_FORM_FIELDS.common.firstName.name}
          type={DRIVERS_FORM_FIELDS.common.firstName.type}
          label={t(DRIVERS_FORM_FIELDS.common.firstName.labelKey)}
          placeholder={t(DRIVERS_FORM_FIELDS.common.firstName.placeholderKey)}
        />
        <ControlledTextInput
          name={DRIVERS_FORM_FIELDS.common.lastName.name}
          type={DRIVERS_FORM_FIELDS.common.lastName.type}
          label={t(DRIVERS_FORM_FIELDS.common.lastName.labelKey)}
          placeholder={t(DRIVERS_FORM_FIELDS.common.lastName.placeholderKey)}
        />
        <ControlledTextInput
          name={DRIVERS_FORM_FIELDS.common.phone.name}
          type={DRIVERS_FORM_FIELDS.common.phone.type}
          label={t(DRIVERS_FORM_FIELDS.common.phone.labelKey)}
          placeholder={t(DRIVERS_FORM_FIELDS.common.phone.placeholderKey)}
        />
        <ControlledTextInput
          name={DRIVERS_FORM_FIELDS.common.email.name}
          type={DRIVERS_FORM_FIELDS.common.email.type}
          label={t(DRIVERS_FORM_FIELDS.common.email.labelKey)}
          placeholder={t(DRIVERS_FORM_FIELDS.common.email.placeholderKey)}
        />
      </FieldGroup>

      <FieldGroup
        columnConfig={{ desktop: { columns: 2 }, mobile: { columns: 1 } }}
        groupNameKey="remuneration:driver_remuneration"
      >
        <ControlledCombobox
          name={`remunerationConfig.${REMUNERATION_FORM_FIELDS.type.name}`}
          label={t(REMUNERATION_FORM_FIELDS.type.labelKey)}
          placeholder={t(REMUNERATION_FORM_FIELDS.type.placeholderKey)}
          data={remunerationTypes}
        />
      </FieldGroup>

      {selectedType === RemunerationModelType.PERCENTAGE_SHARE && (
        <FieldGroup columnConfig={{ desktop: { columns: 2 }, mobile: { columns: 1 } }}>
          <ControlledNumberInput
            min={0}
            suffix="€"
            name={`remunerationConfig.${REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.name}`}
            label={t(REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.labelKey)}
            placeholder={t(REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.placeholderKey)}
          />
          <ControlledNumberInput
            min={1}
            max={100}
            clampBehavior="strict"
            suffix="%"
            name={`remunerationConfig.${REMUNERATION_FORM_FIELDS.percentageShare.driverRevenueSharePercentage.name}`}
            label={t(
              REMUNERATION_FORM_FIELDS.percentageShare.driverRevenueSharePercentage.labelKey
            )}
            placeholder={t(
              REMUNERATION_FORM_FIELDS.percentageShare.driverRevenueSharePercentage.placeholderKey
            )}
          />
        </FieldGroup>
      )}

      {selectedType === RemunerationModelType.WEEKLY_FIXED_RATE && (
        <FieldGroup columnConfig={{ desktop: { columns: 2 }, mobile: { columns: 1 } }}>
          <ControlledNumberInput
            min={0}
            name={`remunerationConfig.${REMUNERATION_FORM_FIELDS.weeklyFixedRate.weeklyFixedCompanySettlement.name}`}
            label={t(
              REMUNERATION_FORM_FIELDS.weeklyFixedRate.weeklyFixedCompanySettlement.labelKey
            )}
            placeholder={t(
              REMUNERATION_FORM_FIELDS.weeklyFixedRate.weeklyFixedCompanySettlement.placeholderKey
            )}
          />
          <ControlledCombobox
            name={`remunerationConfig.${REMUNERATION_FORM_FIELDS.weeklyFixedRate.settlementDay.name}`}
            label={t(REMUNERATION_FORM_FIELDS.weeklyFixedRate.settlementDay.labelKey)}
            placeholder={t(REMUNERATION_FORM_FIELDS.weeklyFixedRate.settlementDay.placeholderKey)}
            data={dayOptions}
          />
        </FieldGroup>
      )}
    </>
  );
};
