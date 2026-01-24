import { useTranslation } from 'react-i18next';
import { Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ControlledTextInput } from '../ControlledTextInput/ControlledTextInput';

export const FormRenderer = ({ formFields }: any) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const groups = formFields.map((group: any) => {
    const columns = isMobile ? group.layout.mobile.columns : group.layout.desktop.columns;
    return (
      <Stack
        gap="xs"
        p="xs"
      >
        <Text
          size="lg"
          c="var(--mantine-primary-color-filled)"
        >
          {t(group.groupName)}
        </Text>

        <SimpleGrid cols={columns}>
          {group.fields.map((field: any) => {
            return (
              <ControlledTextInput
                key={field.name}
                name={field.name}
                type={field.type}
                label={t(field.labelKey)}
                placeholder={t(field.placeholderKey)}
              />
            );
          })}
        </SimpleGrid>
      </Stack>
    );
  });

  return (
    <>
      <Paper
        shadow="sm"
        withBorder
        radius="md"
        p="lg"
      >
        <Stack gap="xl">{groups}</Stack>
      </Paper>
    </>
  );
};
