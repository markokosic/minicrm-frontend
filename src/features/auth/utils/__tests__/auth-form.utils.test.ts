import { describe, expect, it } from 'vitest';
import { mapRegisterFormToMutationBody } from '../auth-form.utils';

describe('auth-form.utils', () => {
  it('mapRegisterFormToMutationBody should strip confirmPassword from form fields', () => {
    const formFields = {
      tenantName: 'Acme Corp',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    expect(mapRegisterFormToMutationBody(formFields)).toEqual({
      tenantName: 'Acme Corp',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
