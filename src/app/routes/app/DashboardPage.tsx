import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <>
      <title>{t('dashboard')}</title>

      <p>Dashboard Page</p>
      <p onClick={() => navigate('/test')}>To test</p>
    </>
  );
};

export default DashboardPage;
