import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mantine/core';
import { Edit2, Trash2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { useGetShiftById } from '@/api/generated/endpoints/shifts/shifts';
import { calculateShiftTotals } from '../utils/shift-calculations.utils';
import { ShiftViewFinancialSummary } from '../components/ShiftViewFinancialSummary';
import { ShiftViewMasterData } from '../components/ShiftViewMasterData';
import { ShiftViewRevenues } from '../components/ShiftViewRevenues';
import { ActionMenu } from '@/components/ui/Menu/ActionMenu';
import { useDeleteShiftAction } from '../hooks/useDeleteShiftAction';
import { ROUTES } from '@/config/routes';

export const ShiftViewPage = () => {
  const { t } = useTranslation(['app', 'common']);
  const { shiftId } = useParams<{ shiftId: string }>();
  const navigate = useNavigate();
  const { handleDelete } = useDeleteShiftAction({
    onSuccess: () => navigate(ROUTES.app.shifts.path),
  });

  const { data: response, isLoading, error } = useGetShiftById(Number(shiftId), {
    query: {
      enabled: !!shiftId && !isNaN(Number(shiftId)),
    },
  });

  const shift = response?.data;

  const { totalRevenue, totalDriverRemuneration, totalCompanyRemuneration } =
    calculateShiftTotals(shift?.revenues || []);

  return (
    <PageLayout 
      title={`${t('app:shifts.detail_title')} #${shiftId}`}
      actions={
        shift && (
          <ActionMenu
            actions={[
              {
                label: t('common:actions.edit', 'Bearbeiten'),
                icon: Edit2,
                onClick: () => console.log('Edit shift', shift.id),
              },
              {
                label: t('common:actions.delete', 'Löschen'),
                icon: Trash2,
                isDanger: true,
                onClick: () => handleDelete(shift),
              },
            ]}
          />
        )
      }
    >
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={!isLoading && !shift}
      >
        {shift && (
          <Stack gap="xl">
            <ShiftViewMasterData shift={shift} />
            <ShiftViewFinancialSummary
              totalRevenue={totalRevenue}
              totalDriverRemuneration={totalDriverRemuneration}
              totalCompanyRemuneration={totalCompanyRemuneration}
            />


            <ShiftViewRevenues revenues={shift.revenues} />
          </Stack>
        )}
      </DataLoadingWrapper>
    </PageLayout>
  );
};

export default ShiftViewPage;
