import { TFunction } from 'i18next';
import { z } from 'zod';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';

export const getRemunerationSchema = (t: TFunction) =>
  z.discriminatedUnion('remunerationModelType', [
    z.object({
      remunerationModelType: z.literal(RemunerationModelType.PERCENTAGE_SHARE),
      minDriverPayout: z
        .number({ error: t('errors:driver.dailyMinPayout.invalid') })
        .min(0, t('errors:driver.dailyMinPayout.invalid')),
      driverRevenueSharePercentage: z
        .number({ error: t('errors:driver.driverRevenueSharePercentage.invalid') })
        .min(0, t('errors:driver.driverRevenueSharePercentage.invalid'))
        .max(100, t('errors:driver.driverRevenueSharePercentage.invalid')),
    }),
    z.object({
      remunerationModelType: z.literal(RemunerationModelType.WEEKLY_FIXED_RATE),
      weeklyFixedCompanySettlement: z.number().positive(t('errors:validation.positive')),
      settlementDay: z
        .number()
        .min(1, t('errors:validation.min', { count: 1 }))
        .max(7, t('errors:validation.max', { count: 7 })),
    }),
  ]);
