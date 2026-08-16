import { useTranslation } from 'react-i18next';
import { Paper, Text } from '@mantine/core';
import { useGetAllShifts } from '@/api/generated/endpoints/shifts/shifts';
import { usePagination } from '@/common/hooks/usePagination';
import { AppPagination } from '@/components/ui/AppPagination';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { ROUTES } from '@/config/routes';
import { useDeleteShiftAction } from '../hooks/useDeleteShiftAction';
import { ShiftsListSkeleton } from './ShiftsListSkeleton';
import { ShiftsTable } from './ShiftsTable';
import { useNavigate } from 'react-router';

export const ShiftsList = () => {
  const { t } = useTranslation(['app', 'common']);
  const { page, size, setPage } = usePagination({ defaultSize: 25 });

  const navigate = useNavigate();

  const { data: response, isLoading, error } = useGetAllShifts({ page, size });
  const pageData = response?.data;
  const shifts = pageData?.content || [];
  const totalPages = pageData?.totalPages || 1;
  const isEmpty = !isLoading && shifts.length === 0;

  const { handleDelete } = useDeleteShiftAction();

  const actions = {
    onViewDetails: (shift: any) => navigate(ROUTES.app.shifts.view.getHref(shift.id)),
    onDelete: handleDelete,
  };

  return (
    <>
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        skeleton={<ShiftsListSkeleton />}
        emptyFallback={
          <Paper withBorder p="xl" radius="md" ta="center">
            <Text c="dimmed">{t('app:shifts.empty')}</Text>
          </Paper>
        }
      >
        <ShiftsTable shifts={shifts} actions={actions} />

        <AppPagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </DataLoadingWrapper>
    </>
  );
};
