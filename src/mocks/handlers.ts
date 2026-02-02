import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('http://localhost:8080/api/auth/login', () => {
    return HttpResponse.json({
      id: 1,
      tenantId: 10,
      firstName: 'John',
      lastName: 'Wick',
      email: 'john@wick.com',
    });
  }),
];
