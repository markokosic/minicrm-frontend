export const paths = {
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
  },

  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    dashboard: {
      path: '',
      getHref: () => '/',
    },
    customers: {
      path: 'customers',
      getHref: () => '/customers',
    },
    offers: {
      path: 'offers',
      getHref: () => '/offers',
    },
    orders: {
      path: 'orders',
      getHref: () => '/orders',
    },
    billing: {
      path: 'billing',
      getHref: () => '/billing',
    },
  },
} as const;
