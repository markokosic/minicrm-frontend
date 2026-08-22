import { useTranslation } from 'react-i18next';
import { Badge, BadgeProps } from '@mantine/core';
import { RevenueReportEntryEntryCategory } from '@/api/generated/model';

export interface EntryCategoryBadgeProps extends Omit<BadgeProps, 'color' | 'children'> {
  category?: RevenueReportEntryEntryCategory | string | null;
  fallback?: React.ReactNode;
}

export const EntryCategoryBadge = ({
  category,
  fallback = '-',
  variant = 'light',
  size = 'sm',
  ...props
}: EntryCategoryBadgeProps) => {
  const { t } = useTranslation(['app']);

  if (!category) {
    return <>{fallback}</>;
  }

  switch (category) {
    case RevenueReportEntryEntryCategory.REGULAR:
      return (
        <Badge color="blue" variant={variant} size={size} {...props}>
          {t('app:reports.categories.REGULAR', 'Regulär')}
        </Badge>
      );
    case RevenueReportEntryEntryCategory.FLAT_RATE:
      return (
        <Badge color="violet" variant={variant} size={size} {...props}>
          {t('app:reports.categories.FLAT_RATE', 'Pauschale')}
        </Badge>
      );
    case RevenueReportEntryEntryCategory.WEEKLY:
      return (
        <Badge color="orange" variant={variant} size={size} {...props}>
          {t('app:reports.categories.WEEKLY', 'Wöchentlich')}
        </Badge>
      );
    default:
      return (
        <Badge color="gray" variant={variant} size={size} {...props}>
          {category}
        </Badge>
      );
  }
};
