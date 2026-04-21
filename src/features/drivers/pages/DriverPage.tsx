import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router';
import { PageLayout } from 'src/components/layout/PageLayout';
import { DriverUpdateForm } from '../components/DriverUpdateForm';
import { useGetDriver } from '../hooks/useGetDriver';

export const DriverPage = () => {
  const { t } = useTranslation();

  const { driverId } = useParams<{ driverId: string }>();

  const { data: driver, isLoading, error } = useGetDriver({ driverId: Number(driverId) });

  if (isLoading) return <p>bla</p>;

  return (
    <PageLayout title={t('drivers:driver')}>
      <DriverUpdateForm driver={driver} />
    </PageLayout>
  );
};
