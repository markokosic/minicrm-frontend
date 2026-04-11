import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Form } from 'src/components/ui/Form';
import { ROUTES } from 'src/config/routes';
import { Box, Button } from '@mantine/core';
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

  const formFields = [
    {
      groupName: 'form:groups.general_information',
      layout: { desktop: { columns: 2 }, mobile: { columns: 1 } },
      fields: [{ ...DRIVERS_FORM_FIELDS.common }],
    },
  ];

  return (
    <Box>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        formFields={formFields}
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
      />
    </Box>
  );
};
