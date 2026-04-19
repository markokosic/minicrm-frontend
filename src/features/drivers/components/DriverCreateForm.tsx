import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { FieldGroup, Form } from 'src/components/ui/Form';
import { ROUTES } from 'src/config/routes';
import { Box, Button } from '@mantine/core';
import { ControlledSelect } from '@/components/ui/ControlledSelect/ControlledSelect';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput/ControlledTextInput';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';
import { DRIVERS_FORM_FIELDS } from '../config/drivers-form-fields';
import { getCreateDriverSchema } from '../drivers-schemas';
import { CreateDriverRequest } from '../drivers-types';
import { useCreateDriver } from '../hooks/useCreateDriver';

export const DriverCreateForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDriver({});

  const methods = useForm({
    resolver: zodResolver(getCreateDriverSchema(t)),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = (data: CreateDriverRequest) => {
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

  const remunerationModelType = methods.watch('remunerationConfig.remunerationModelType' as const);

  const isPercentage = remunerationModelType === RemunerationModelType.PERCENTAGE_SHARE;

  const percentageFields = [
    DRIVERS_FORM_FIELDS.remunerationConfig.minDriverPayout,
    DRIVERS_FORM_FIELDS.remunerationConfig.driverRevenueSharePercentage,
  ];

  const fixedFields = [
    DRIVERS_FORM_FIELDS.remunerationConfig.weeklyFixedCompanySettlement,
    DRIVERS_FORM_FIELDS.remunerationConfig.settlementDay,
  ];

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
            key={DRIVERS_FORM_FIELDS.common.firstName.name}
            name={DRIVERS_FORM_FIELDS.common.firstName.name}
            type={DRIVERS_FORM_FIELDS.common.firstName.type}
            label={t(DRIVERS_FORM_FIELDS.common.firstName.labelKey)}
            placeholder={t(DRIVERS_FORM_FIELDS.common.firstName.placeholderKey)}
          />
          <ControlledTextInput
            key={DRIVERS_FORM_FIELDS.common.lastName.name}
            name={DRIVERS_FORM_FIELDS.common.lastName.name}
            type={DRIVERS_FORM_FIELDS.common.lastName.type}
            label={t(DRIVERS_FORM_FIELDS.common.lastName.labelKey)}
            placeholder={t(DRIVERS_FORM_FIELDS.common.lastName.placeholderKey)}
          />
          <ControlledTextInput
            key={DRIVERS_FORM_FIELDS.common.phone.name}
            name={DRIVERS_FORM_FIELDS.common.phone.name}
            type={DRIVERS_FORM_FIELDS.common.phone.type}
            label={t(DRIVERS_FORM_FIELDS.common.phone.labelKey)}
            placeholder={t(DRIVERS_FORM_FIELDS.common.phone.placeholderKey)}
          />
          <ControlledTextInput
            key={DRIVERS_FORM_FIELDS.common.email.name}
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
          <ControlledSelect
            key={DRIVERS_FORM_FIELDS.remunerationConfig.remunerationModelType.name}
            name={DRIVERS_FORM_FIELDS.remunerationConfig.remunerationModelType.name}
            type={DRIVERS_FORM_FIELDS.remunerationConfig.remunerationModelType.type}
            label={t(DRIVERS_FORM_FIELDS.remunerationConfig.remunerationModelType.labelKey)}
            placeholder={t(
              DRIVERS_FORM_FIELDS.remunerationConfig.remunerationModelType.placeholderKey
            )}
            data={[
              {
                label: t('remuneration:type.percentageShare'),
                value: RemunerationModelType.PERCENTAGE_SHARE,
              },
              {
                label: t('remuneration:type.weeklyFixedRate'),
                value: RemunerationModelType.WEEKLY_FIXED_RATE,
              },
            ]}
          />
        </FieldGroup>
      </Form>
    </Box>
  );
};
