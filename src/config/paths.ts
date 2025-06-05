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
  },
} as const;
