import { describe, expect, it, vi } from 'vitest';
import { CustomerType } from '../../types/customers-types';
import {
  getAddCustomerSchema,
  getBusinessDataSchema,
  getConsumerDataSchema,
  getUpdateCustomerSchema,
} from '../customers-schema';

const tMock = vi.fn((key: string) => key) as any;

describe('Customer Schemas', () => {
  describe('Consumer Schema Validations', () => {
    it('should validate correct consumer data', () => {
      const schema = getConsumerDataSchema(tMock);
      const validData = {
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max@example.com',
        phone: '+4912345678',
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if email is invalid', () => {
      const schema = getConsumerDataSchema(tMock);
      const result = schema.safeParse({
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'not-an-email',
        phone: '123',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('Business Schema Validations', () => {
    const schema = getBusinessDataSchema(tMock);

    it('should validate correct business data including website', () => {
      const validData = {
        companyName: 'Tech Corp',
        vat: 'DE123456789',
        email: 'info@tech.corp',
        phone: '012345',
        website: 'https://www.tech.corp',
      };

      expect(schema.safeParse(validData).success).toBe(true);
    });

    it('should fail on invalid website URL', () => {
      const invalidData = {
        companyName: 'Tech Corp',
        vat: 'DE123456789',
        email: 'info@tech.corp',
        phone: '012345',
        website: 'not-a-website',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('errors:url.invalid');
      }
    });
  });

  describe('Discriminated Union (AddCustomer)', () => {
    const schema = getAddCustomerSchema(tMock);

    it('should validate a valid consumer within the union', () => {
      const result = schema.safeParse({
        type: CustomerType.CONSUMER,
        firstName: 'Erika',
        lastName: 'Mustermann',
        email: 'erika@web.de',
        phone: '0171',
      });
      expect(result.success).toBe(true);
    });

    it('should fail if business fields are missing when type is BUSINESS', () => {
      const result = schema.safeParse({
        type: CustomerType.BUSINESS,
        companyName: 'ACME',
        // vat fehlt!
      });
      expect(result.success).toBe(false);
    });
  });
});

describe('getUpdateCustomerSchema', () => {
  const schema = getUpdateCustomerSchema(tMock);

  describe('Consumer Update', () => {
    it('should validate when only partial consumer data is provided', () => {
      const partialConsumer = {
        id: 1,
        type: CustomerType.CONSUMER,
        firstName: 'Max',
      };

      const result = schema.safeParse(partialConsumer);
      expect(result.success).toBe(true);
    });

    it('should fail if id is missing in consumer update', () => {
      const invalidConsumer = {
        type: CustomerType.CONSUMER,
        firstName: 'Max',
      };

      const result = schema.safeParse(invalidConsumer);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('id');
      }
    });
  });

  describe('Business Update', () => {
    it('should validate when only partial business data is provided', () => {
      const partialBusiness = {
        id: 99,
        type: CustomerType.BUSINESS,
        companyName: 'New Tech GmbH',
      };

      const result = schema.safeParse(partialBusiness);
      expect(result.success).toBe(true);
    });

    it('should fail if the wrong type is provided for business fields (vat)', () => {
      const invalidBusiness = {
        id: 99,
        type: CustomerType.BUSINESS,
        vat: 12345,
      };

      const result = schema.safeParse(invalidBusiness);
      expect(result.success).toBe(false);
    });
  });

  describe('Type Switching', () => {
    it('should fail if type and data structure do not match', () => {
      const mismatch = {
        id: 5,
        type: CustomerType.CONSUMER,
        companyName: 'This field belongs to BusinessData',
      };

      const result = schema.safeParse(mismatch);
      expect(result.success).toBe(false);
    });
  });
});
