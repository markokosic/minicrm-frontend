import { CustomerType } from '../types/customers-types';

export const CUSTOMER_FORM_FIELDS = {
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
  },

  [CustomerType.CONSUMER]: {
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

  [CustomerType.BUSINESS]: {
    companyName: {
      name: 'companyName',
      labelKey: 'form:companyName.label',
      placeholderKey: 'form:companyName.placeholder',
      type: 'text',
      autoComplete: 'organization',
    },
    vat: {
      name: 'vat',
      labelKey: 'form:vat.label',
      placeholderKey: 'form:vat.placeholder',
      type: 'text',
    },
    website: {
      name: 'website',
      labelKey: 'form:website.label',
      placeholderKey: 'form:website.placeholder',
      type: 'text',
      autoComplete: 'url',
    },
  },
};
