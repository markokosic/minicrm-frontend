import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type ColumnConfig = {
  desktop: { columns: number };
  mobile: { columns: number };
};

type FieldGroupProps = {
  children: ReactNode;
  columnConfig: ColumnConfig;
  groupNameKey?: string;
};

export const FieldGroup = ({
  children,
  columnConfig: columnConfig,
  groupNameKey,
}: FieldGroupProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const columns = isMobile ? columnConfig.mobile.columns : columnConfig.desktop.columns;

  return (
    <>
      {groupNameKey && (
        <Text
          size="lg"
          c="var(--mantine-primary-color-filled)"
        >
          {t(groupNameKey)}
        </Text>
      )}
      <SimpleGrid cols={columns}>{children}</SimpleGrid>
    </>
  );
};
