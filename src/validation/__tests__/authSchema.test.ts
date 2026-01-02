import { describe, it, expect } from 'vitest';
import { getRegisterFormSchema } from '@/validation/authSchema';
import { TFunction } from 'i18next';

const mockT = (key: string) => key; // liefert Keys statt echter Texte

describe('getRegisterFormSchema', () => {
  const schema = getRegisterFormSchema(mockT as TFunction);

  it('accepts a fully valid payload', () => {
    const result = schema.safeParse({
      tenantName: 'Acme',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Secret123',
      confirmPassword: 'Secret123',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('john@example.com');
    }
  });

  it('rejects when confirmation mismatches password', () => {
    const result = schema.safeParse({
      tenantName: 'Acme',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Secret123',
      confirmPassword: 'Mismatch',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      // Fehler sitzt am confirmPassword-Feld und zeigt den erwarteten Key
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain('errors:validation.password_mismatch');
    }
  });

  it('rejects invalid email and empty names', () => {
    const result = schema.safeParse({
      tenantName: '',
      firstName: '',
      lastName: '',
      email: 'not-an-email',
      password: '123',
      confirmPassword: '123',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      expect(fields.email).toContain('errors:validation.email.invalid');
      expect(fields.tenantName).toContain('errors:validation.name.required');
      expect(fields.password).toContain('errors:validation.password.min_length');
    }
  });
});
