import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { CreateShiftForm } from '../components/CreateShiftForm';

export const CreateShiftPage = () => {
  const { t } = useTranslation(['app', 'common']);

  return (
    <PageLayout title={t('app:shifts.create_page_title')}>
      <CreateShiftForm />
    </PageLayout>
  );
};

export default CreateShiftPage;
