import { http, HttpResponse } from 'msw';
import { getAuthenticationMock } from '@/api/generated/endpoints/authentication/authentication.msw';
import { getCarsMock } from '@/api/generated/endpoints/cars/cars.msw';
import { getDriversMock } from '@/api/generated/endpoints/drivers/drivers.msw';
import { getReportsMock } from '@/api/generated/endpoints/reports/reports.msw';
import { getRevenuesMock } from '@/api/generated/endpoints/revenues/revenues.msw';
import { getUsersMock } from '@/api/generated/endpoints/users/users.msw';

export const handlers = [
  // Custom fallback / overrides
  http.post('http://localhost:8080/api/auth/login', () => {
    return HttpResponse.json({
      id: 1,
      tenantId: 10,
      firstName: 'John',
      lastName: 'Wick',
      email: 'john@wick.com',
    });
  }),
  // Orval auto-generated MSW handlers with Faker mock data
  ...getAuthenticationMock(),
  ...getCarsMock(),
  ...getDriversMock(),
  ...getReportsMock(),
  ...getRevenuesMock(),
  ...getUsersMock(),
];

