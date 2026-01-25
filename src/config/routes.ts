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
    customers: {
      path: '/customers',
      getHref: () => '/customers',
      view: {
        path: '/customers/:customerId',
        getHref: (customerId: number | string) => `/customers/${customerId}`,
      },
      edit: {
        path: '/customers/:customerId/edit',
        getHref: (customerId: number | string) => `/customers/${customerId}/edit`,
      },
      add: {
        path: '/customers/new',
        getHref: () => '/customers/new',
      },
    },
    offers: {
      path: '/offers',
      getHref: () => '/offers',
    },
    orders: {
      path: '/orders',
      getHref: () => '/orders',
    },
    billing: {
      path: '/billing',
      getHref: () => '/billing',
    },
    settings: {
      path: '/settings',
      getHref: () => '/settings',
    },
  },
} as const;
