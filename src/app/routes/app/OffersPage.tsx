import { useTranslation } from 'react-i18next';

export const OffersPage = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <title>{t('offers')}</title>
    </>
  );
};
