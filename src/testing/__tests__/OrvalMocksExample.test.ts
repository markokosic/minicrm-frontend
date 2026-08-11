import { describe, expect, it } from 'vitest';
import {
  getGetCarResponseMock,
  getGetAllCarsResponseMock,
} from '@/api/generated/endpoints/cars/cars.msw';
import { getGetUserResponseMock } from '@/api/generated/endpoints/users/users.msw';

describe('Orval Fake Data Mocks', () => {
  it('generates realistic fake car data using @faker-js/faker with optional overrides', () => {
    const fakeCarResponse = getGetCarResponseMock({
      data: {
        id: 42,
        brand: 'Porsche',
        model: '911 GT3',
        licensePlate: 'M-CS 911',
        status: 'ACTIVE',
      },
    });

    expect(fakeCarResponse.data?.id).toBe(42);
    expect(fakeCarResponse.data?.brand).toBe('Porsche');
    expect(fakeCarResponse.data?.model).toBe('911 GT3');
    expect(fakeCarResponse.data?.status).toBe('ACTIVE');
  });

  it('generates fake car list data structure out-of-the-box', () => {
    const fakeCarsResponse = getGetAllCarsResponseMock();
    expect(fakeCarsResponse).toBeDefined();
  });

  it('generates realistic fake user response mock', () => {
    const fakeUserResponse = getGetUserResponseMock();
    expect(fakeUserResponse).toBeDefined();
  });
});
