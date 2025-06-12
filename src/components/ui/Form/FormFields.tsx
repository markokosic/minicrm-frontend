import { createInputWrapper } from './FormInputFactory';

export const EmailInput = createInputWrapper({
  name: 'email',
  labelKey: 'form:email.label',
  placeholderKey: 'form:email.placeholder',
  type: 'text',
  autoComplete: 'email',
});

export const PasswordInput = createInputWrapper({
  name: 'password',
  labelKey: 'form:password.label',
  placeholderKey: 'form:password.placeholder',
  type: 'password',
  autoComplete: 'current-password',
});
