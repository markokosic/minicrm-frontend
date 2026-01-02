import { useWatch, Watch } from 'react-hook-form';
import { createInputWrapper } from './FormInputFactory';

export const EmailInput = createInputWrapper({
  name: 'email',
  labelKey: 'form:email.label',
  placeholderKey: 'form:email.placeholder',
  type: 'text',
  autoComplete: 'email',
});

export const TenantNameInput = createInputWrapper({
  name: 'tenantName',
  labelKey: 'form:tenantName.label',
  placeholderKey: 'form:tenantName.placeholder',
  type: 'text',
});

export const FirstNameInput = createInputWrapper({
  name: 'firstName',
  labelKey: 'form:firstName.label',
  placeholderKey: 'form:firstName.placeholder',
  type: 'text',
  autoComplete: 'given-name',
});

export const LastNameInput = createInputWrapper({
  name: 'lastName',
  labelKey: 'form:lastName.label',
  placeholderKey: 'form:lastName.placeholder',
  type: 'text',
  autoComplete: 'family-name',
});

export const PasswordInput = createInputWrapper({
  name: 'password',
  labelKey: 'form:password.label',
  placeholderKey: 'form:password.placeholder',
  type: 'password',
  autoComplete: 'current-password',
});

export const ConfirmPasswordInput = createInputWrapper({
  name: 'confirmPassword',
  labelKey: 'form:confirmPassword.label',
  placeholderKey: 'form:confirmPassword.placeholder',
  type: 'password',
});
