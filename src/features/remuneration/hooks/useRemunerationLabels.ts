import { useTranslation } from 'react-i18next';
import { RemunerationModelType } from '../remuneration-types';

export const i18nDriverRemunerationConfigMap: Record<RemunerationModelType, string> = {
  [RemunerationModelType.PERCENTAGE_SHARE]: 'percentageShare',
  [RemunerationModelType.WEEKLY_FIXED_RATE]: 'weeklyFixedRate',
  [RemunerationModelType.FLAT_RATE]: 'flatRate',
};

export const useRemunerationLabels = () => {
  const { t } = useTranslation(['app']);

  const getRemunerationLabel = (type?: RemunerationModelType | null) => {
    if (!type) {return '';}
    const key = i18nDriverRemunerationConfigMap[type];
    return key ? t(`app:remuneration.type.${key}`) : type;
  };

  const remunerationTypeOptions = [
    {
      label: getRemunerationLabel(RemunerationModelType.PERCENTAGE_SHARE),
      value: RemunerationModelType.PERCENTAGE_SHARE,
    },
    {
      label: getRemunerationLabel(RemunerationModelType.WEEKLY_FIXED_RATE),
      value: RemunerationModelType.WEEKLY_FIXED_RATE,
    },
    {
      label: getRemunerationLabel(RemunerationModelType.FLAT_RATE),
      value: RemunerationModelType.FLAT_RATE,
    },
  ];

  return {
    getRemunerationLabel,
    remunerationTypeOptions,
  };
};
