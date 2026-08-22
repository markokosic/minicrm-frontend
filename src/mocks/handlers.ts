import { http, HttpResponse } from 'msw';
import { getAuthenticationMock } from '@/api/generated/endpoints/authentication/authentication.msw';
import { getCarsMock } from '@/api/generated/endpoints/cars/cars.msw';
import { getDriversMock } from '@/api/generated/endpoints/drivers/drivers.msw';
import { getFlatRateTypesMock } from '@/api/generated/endpoints/flat-rate-types/flat-rate-types.msw';
import { getReportsMock } from '@/api/generated/endpoints/reports/reports.msw';
import { getRevenuesMock } from '@/api/generated/endpoints/revenues/revenues.msw';
import { getShiftsMock } from '@/api/generated/endpoints/shifts/shifts.msw';
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
  http.get('*/api/drivers/:id/revenue-options', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          entryCategory: 'REGULAR',
          label: 'Normale Fahrten (Taxameter)',
        },
        {
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: 1,
          label: 'Flughafentransfer Wien -> Graz',
          defaultPrice: 150.0,
        },
        {
          entryCategory: 'FLAT_RATE',
          flatRateTypeId: null,
          label: 'Pauschalfahrt Allgemein',
          defaultPrice: 200.0,
        },
        {
          entryCategory: 'WEEKLY',
          label: 'Wöchentliche Fixpauschale',
          defaultPrice: 500.0,
        },
      ],
    });
  }),
  // Orval auto-generated MSW handlers with Faker mock data
  ...getAuthenticationMock(),
  ...getCarsMock(),
  ...getDriversMock(),
  ...getFlatRateTypesMock(),
  ...getReportsMock(),
  ...getRevenuesMock(),
  ...getShiftsMock(),
  ...getUsersMock(),
];

