import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { FieldGroup, Form } from 'src/components/ui/Form';
import { ROUTES } from 'src/config/routes';
import { Box, Button } from '@mantine/core';
import { DAYS_OF_THE_WEEK } from '@/common/constants';
import { ControlledNumberInput } from '@/components/ui/ControlledNumberInput/ControlledNumberInput';
import { ControlledCombobox } from '@/components/ui/ControlledSelect/ControlledCombobox';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { REMUNERATION_FORM_FIELDS } from '@/features/remuneration/config/remuneration-form-fields';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { DRIVERS_FORM_FIELDS } from '../config/drivers-form-fields';
import { getCreateDriverSchema } from '../drivers-schemas';
import { CreateDriverRequest } from '../drivers-types';
import { useCreateDriver } from '../hooks/useCreateDriver';

export const DriverCreateForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDriver({});

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

  const methods = useForm({
    resolver: zodResolver(getCreateDriverSchema(t)),
    shouldUnregister: true,
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      remunerationConfig: {
        remunerationModelType: undefined,
      },
    },
  });

  const onSubmit = (data: CreateDriverRequest) => {
    console.log('FORM SUBMIT DATA:', data);
    mutate(
      { data },
      {
        onSuccess: (response) => {
          const newId = response?.id;
          navigate(ROUTES.app.drivers.view.getHref(newId));
          toast.success(t('drivers:notifications.create.success'));
        },
      }
    );
  };

  const selectedType = useWatch({
    control: methods.control,
    name: `remunerationConfig.${REMUNERATION_FORM_FIELDS.type.name}` as any,
  });

  return (
    <Box>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        formActions={
          <>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              {t('common:actions.cancel')}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={!methods.formState.isDirty || isPending}
            >
              {t('drivers:actions.add_driver')}
            </Button>
          </>
        }
      >
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
              placeholder={t(
                REMUNERATION_FORM_FIELDS.percentageShare.minDriverPayout.placeholderKey
              )}
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
      </Form>
    </Box>
  );
};
