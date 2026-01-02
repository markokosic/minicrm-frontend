export interface FieldConfig {
  name: string;
  labelKey: string;
  placeholderKey: string;
  autoComplete?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number';
}

export const FORM_FIELDS = {
  // --- AUTHENTICATION ---
  email: {
    name: 'email',
    labelKey: 'form:email.label',
    placeholderKey: 'form:email.placeholder',
    type: 'email',
    autoComplete: 'email',
  },
  password: {
    name: 'password',
    labelKey: 'form:password.label',
    placeholderKey: 'form:password.placeholder',
    type: 'password',
    autoComplete: 'current-password',
  },
  confirmPassword: {
    name: 'confirmPassword',
    labelKey: 'form:confirmPassword.label',
    placeholderKey: 'form:confirmPassword.placeholder',
    type: 'password',
    autoComplete: 'new-password',
  },

  // --- PERSONAL DATA ---
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
  phone: {
    name: 'phone',
    labelKey: 'form:phone.label',
    placeholderKey: 'form:phone.placeholder',
    type: 'tel',
    autoComplete: 'tel',
  },

  // --- ADDRESS DATA ---
  street: {
    name: 'street',
    labelKey: 'form:street.label',
    placeholderKey: 'form:street.placeholder',
    type: 'text',
    autoComplete: 'street-address',
  },
  zip: {
    name: 'zip',
    labelKey: 'form:zip.label',
    placeholderKey: 'form:zip.placeholder',
    type: 'text',
    autoComplete: 'postal-code',
  },
  city: {
    name: 'city',
    labelKey: 'form:city.label',
    placeholderKey: 'form:city.placeholder',
    type: 'text',
    autoComplete: 'address-level2',
  },

  // --- ORGANIZATIONAL ---
  tenantName: {
    name: 'tenantName',
    labelKey: 'form:tenantName.label',
    placeholderKey: 'form:tenantName.placeholder',
    type: 'text',
  },
  companyName: {
    name: 'companyName',
    labelKey: 'form:companyName.label',
    placeholderKey: 'form:companyName.placeholder',
    type: 'text',
    autoComplete: 'organization',
  },
} as const;

export type FormFieldName = keyof typeof FORM_FIELDS;
