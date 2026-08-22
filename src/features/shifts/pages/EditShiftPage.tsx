import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { DataLoadingWrapper } from '@/components/ui/DataLoadingWrapper';
import { useGetShiftById } from '@/api/generated/endpoints/shifts/shifts';
import { EditShiftForm } from '../components/EditShiftForm';

export const EditShiftPage = () => {
  const { t } = useTranslation(['app', 'common']);
  const { shiftId } = useParams<{ shiftId: string }>();

  const { data: response, isLoading, error } = useGetShiftById(Number(shiftId), {
    query: {
      enabled: !!shiftId && !isNaN(Number(shiftId)),
    },
  });

  const shift = response?.data;

  return (
    <PageLayout
      title={`${t('app:shifts.edit_page_title', 'Schicht bearbeiten')} #${shiftId}`}
      showBack
    >
      <DataLoadingWrapper
        isLoading={isLoading}
        error={error}
        isEmpty={!isLoading && !shift}
      >
        {shift && <EditShiftForm shift={shift} />}
      </DataLoadingWrapper>
    </PageLayout>
  );
};

export default EditShiftPage;
