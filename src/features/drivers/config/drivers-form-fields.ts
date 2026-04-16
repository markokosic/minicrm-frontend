import { FormFieldsGroupConfig } from '@/common/types/common-types';
import { RemunerationModelType } from '@/features/remuneration/remuneration-types';

export const DRIVERS_FORM_FIELDS: FormFieldsGroupConfig = {
  common: {
    email: {
      name: 'email',
      labelKey: 'form:email.label',
      placeholderKey: 'form:email.placeholder',
      type: 'email',
      autoComplete: 'email',
    },
    phone: {
      name: 'phone',
      labelKey: 'form:phone.label',
      placeholderKey: 'form:phone.placeholder',
      type: 'tel',
      autoComplete: 'tel',
    },
    firstName: {
      name: 'firstName',
      labelKey: 'form:firstName.label',
      placeholderKey: 'form:firstName.placeholder',
      type: 'text',
      autoComplete: 'given-name',
    },
    lastName: {
      name: 'lastName',
      labelKey: 'form:lastName.label',
      placeholderKey: 'form:lastName.placeholder',
      type: 'text',
      autoComplete: 'family-name',
    },
  },
  remunerationConfig: {
    remunerationModelType: {
      name: 'remunerationModelType',
      labelKey: 'remuneration:type.label',
      placeholderKey: 'remuneration:type.placeholder',
      type: 'select',
      options: [
        {
          labelKey: 'remuneration:type.percentageShare',
          value: RemunerationModelType.PERCENTAGE_SHARE,
        },
        {
          labelKey: 'remuneration:type.weeklyFixedRate',
          value: RemunerationModelType.WEEKLY_FIXED_RATE,
        },
      ],
    },

    minDriverPayout: {
      name: 'minDriverPayout',
      labelKey: 'remuneration:minDriverPayout.label',
      placeholderKey: 'remuneration:minDriverPayout.placeholder',
      type: 'number',
    },

    driverRevenueSharePercentage: {
      name: 'driverRevenueSharePercentage',
      labelKey: 'remuneration:driverRevenueSharePercentage.label',
      placeholderKey: 'remuneration:driverRevenueSharePercentage.placeholder',
      type: 'number',
    },

    weeklyFixedCompanySettlement: {
      name: 'weeklyFixedCompanySettlement',
      labelKey: 'remuneration:weeklyFixedCompanySettlement.label',
      placeholderKey: 'remuneration:weeklyFixedCompanySettlement.placeholder',
      type: 'number',
    },

    settlementDay: {
      name: 'settlementDay',
      labelKey: 'remuneration:settlementDay.label',
      placeholderKey: 'remuneration:settlementDay.placeholder',
      type: 'number',
    },
  },
};
