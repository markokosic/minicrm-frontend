import { CustomerId } from '../../_ARCHIVE/customers/types/customers-types';

export const ROUTES = {
  auth: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    register: {
      path: '/register',
      getHref: () => '/register',
    },
    login: {
      path: '/login',
      getHref: () => '/login',
    },
    resetPassword: {
      path: '/reset-password',
    },
  },

  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    dashboard: {
      path: '/',
      getHref: () => '/',
    },
    drivers: {
      path: '/drivers',
      getHref: () => '/drivers',
      view: {
        path: '/drivers/:driverId',
        getHref: (driverId: CustomerId) =>
          `/drivers/${driverId}`,
      },
      edit: {
        path: '/customers/:customerId/edit',
        getHref: (customerId: CustomerId) => `/customers/${customerId}/edit`,
      },
      create: {
        path: '/drivers/new',
        getHref: () => '/drivers/new',
      },
    },
    revenues: {
      path: '/revenues',
      getHref: () => '/revenues',
    },

    settings: {
      path: '/settings',
      getHref: () => '/settings',
    },
  },
} as const;
