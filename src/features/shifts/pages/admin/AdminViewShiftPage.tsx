import { Edit2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Stack } from '@mantine/core';
import { useGetShiftById } from '@/api/generated/endpoints/shifts/shifts';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/shared/components/ui/DataLoadingWrapper';
import { ActionMenu } from '@/shared/components/ui/ActionMenu';
import { ROUTES } from '@/config/routes';
import { calculateShiftTotals } from '../../domain/shift-calculations';
import { useDeleteShiftAction } from '../../hooks/admin/useDeleteShiftAction';
import { ShiftViewMasterData } from '../../components/admin/ShiftViewMasterData';
import { ShiftViewFinancialSummary } from '../../components/admin/ShiftViewFinancialSummary';
import { ShiftViewRevenues } from '../../components/admin/ShiftViewRevenues';

export const AdminViewShiftPage = () => {
  const { t } = useTranslation(['app', 'common']);
  const { shiftId } = useParams<{ shiftId: string }>();
  const navigate = useNavigate();
  const { shifts: shiftsRoute } = ROUTES.app;

  const { handleDelete } = useDeleteShiftAction({
    onSuccess: () => navigate(shiftsRoute.path),
  });

  const {
    data: response,
    isLoading,
    error,
  } = useGetShiftById(Number(shiftId), {
    query: {
      enabled: !!shiftId && !isNaN(Number(shiftId)),
    },
  });

  const shiftResponse = response?.data;

  const { totalRevenue, totalDriverRemuneration, totalCompanyRemuneration } = calculateShiftTotals(
    shiftResponse?.revenues || []
  );

  return (
    <PageLayout
      title={`${t('app:shifts.detail_title')} #${shiftId}`}
      actions={
        shiftResponse && (
          <ActionMenu
            actions={[
              {
                label: t('common:actions.edit', 'Bearbeiten'),
                icon: Edit2,
                onClick: () => navigate(ROUTES.app.shifts.edit.getHref(shiftResponse.id!)),
              },
              {
                label: t('common:actions.delete', 'Löschen'),
                icon: Trash2,
                isDanger: true,
                onClick: () => handleDelete(shiftResponse),
              },
            ]}
          />
        )
      }
    >
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={!isLoading && !shiftResponse}
      >
        {shiftResponse && (
          <Stack gap="xl">
            <ShiftViewMasterData shift={shiftResponse} />
            <ShiftViewFinancialSummary
              totalRevenue={totalRevenue}
              totalDriverRemuneration={totalDriverRemuneration}
              totalCompanyRemuneration={totalCompanyRemuneration}
            />

            <ShiftViewRevenues revenues={shiftResponse.revenues} />
          </Stack>
        )}
      </DataLoadingWrapper>
    </PageLayout>
  );
};

export default AdminViewShiftPage;
