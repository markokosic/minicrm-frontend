import { useTranslation } from 'react-i18next';
import { Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FieldConfig } from '@/common/types/common-types';
import { ControlledTextInput } from '../ControlledTextInput/ControlledTextInput';

type FormRendererProps = {
  formFields: FormFieldGroup[];
};

type FormFieldGroup = {
  groupName?: string;
  layout: { desktop: { columns: number }; mobile: { columns: number } };
  fields: FormFieldConfigWithOptions[];
};

interface FormFieldConfigWithOptions extends FieldConfig {
  isDisabled?: boolean;
  allowedRoles?: string[]; //add enum later
}

export const FormRenderer = ({ formFields }: FormRendererProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const groups = formFields.map((group: any) => {
    const columns = isMobile ? group.layout.mobile.columns : group.layout.desktop.columns;
    return (
      <Stack
        gap="xs"
        p="xs"
      >
        {group.groupName && (
          <Text
            size="lg"
            c="var(--mantine-primary-color-filled)"
          >
            {t(group.groupName)}
          </Text>
        )}

        <SimpleGrid cols={columns}>
          {group.fields.map((field: any) => {
            return (
              <ControlledTextInput
                key={field.name}
                name={field.name}
                type={field.type}
                label={t(field.labelKey)}
                placeholder={t(field.placeholderKey)}
                readOnly={field.isDisabled}
              />
            );
          })}
        </SimpleGrid>
      </Stack>
    );
  });

  return <Stack gap="sm">{groups}</Stack>;
};
