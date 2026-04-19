import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
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
    name: DRIVERS_FORM_FIELDS.remunerationConfig.remunerationModelType.name as any,
  });

  console.log('WATCH VALUE:', selectedType);

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
          <ControlledSelect
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

          {selectedType === RemunerationModelType.PERCENTAGE_SHARE && (
            <ControlledTextInput
              name={DRIVERS_FORM_FIELDS.remunerationConfig.minDriverPayout.name}
              type={DRIVERS_FORM_FIELDS.remunerationConfig.minDriverPayout.type}
              label={t(DRIVERS_FORM_FIELDS.remunerationConfig.minDriverPayout.labelKey)}
              placeholder={t(DRIVERS_FORM_FIELDS.remunerationConfig.minDriverPayout.placeholderKey)}
            />
          )}
        </FieldGroup>
      </Form>
    </Box>
  );
};
