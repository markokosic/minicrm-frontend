import { describe, expect, it } from 'vitest';
import {
  BusinessData,
  ConsumerData,
  CustomerType,
  UpdateBusinessCustomer,
  UpdateConsumerCustomer,
} from '../../types/customers-types';
import {
  mapBusinessCustomerToAddDTO,
  mapBusinessCustomerToUpdateDTO,
  mapConsumerCustomerToAddDTO,
  mapConsumerCustomerToUpdateDTO,
} from '../customers-mappers';

describe('Customer Mapping Logic', () => {
  describe('Update Mappers (Stripping MetaData)', () => {
    it('should extract only BusinessData from UpdateBusinessCustomer', () => {
      const input: UpdateBusinessCustomer = {
        id: 1,
        tenantId: 100,
        type: CustomerType.BUSINESS,
        companyName: 'ACME Corp',
        vat: 'DE123456',
        email: 'info@acme.com',
        phone: '01234',
        website: 'https://acme.com',
      };

      const result = mapBusinessCustomerToUpdateDTO(input);

      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('tenantId');
      expect(result).not.toHaveProperty('type');

      expect(result).toEqual({
        companyName: 'ACME Corp',
        vat: 'DE123456',
        email: 'info@acme.com',
        phone: '01234',
        website: 'https://acme.com',
      });
    });

    it('should handle partial ConsumerData correctly', () => {
      const input: UpdateConsumerCustomer = {
        id: 2,
        tenantId: 100,
        type: CustomerType.CONSUMER,
        firstName: 'Max',
      };

      const result = mapConsumerCustomerToUpdateDTO(input);

      expect(result).toEqual({ firstName: 'Max' });
      expect(result).not.toHaveProperty('id');
      expect(result).not.toHaveProperty('tenantId');
      expect(result).not.toHaveProperty('type');
    });
  });

  describe('Add Mappers (Injecting Type)', () => {
    it('should create a valid AddConsumerCustomer DTO', () => {
      const data: ConsumerData = {
        firstName: 'Erika',
        lastName: 'Mustermann',
        email: 'erika@test.de',
        phone: '09876',
      };

      const result = mapConsumerCustomerToAddDTO(data, CustomerType.CONSUMER);

      expect(result).toEqual({
        ...data,
        type: CustomerType.CONSUMER,
      });
    });

    it('should create a valid AddBusinessCustomer DTO', () => {
      const data: BusinessData = {
        companyName: 'Tech StartUp',
        vat: 'AT123',
        email: 'hello@tech.at',
        phone: '555-123',
        website: 'tech.at',
      };

      const result = mapBusinessCustomerToAddDTO(data, CustomerType.BUSINESS);

      expect(result.type).toBe(CustomerType.BUSINESS);
      expect(result.companyName).toBe('Tech StartUp');
    });
  });
});
