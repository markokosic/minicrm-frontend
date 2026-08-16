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
    
  },

  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    dashboard: {
      path: '/dashboard',
      getHref: () => '/dashboard',
    },
    drivers: {
      path: '/drivers',
      getHref: () => '/drivers',
      view: {
        path: '/drivers/:driverId',
        getHref: (driverId: number | string) =>
          `/drivers/${driverId}`,
      },
      create: {
        path: '/drivers/new',
        getHref: () => '/drivers/new',
      },
    },
    cars: {
      path: '/cars',
      getHref: () => '/cars',
      view: {
        path: '/cars/:carId',
        getHref: (carId: number) =>
          `/cars/${carId}`,
      },
      create: {
        path: '/cars/new',
        getHref: () => '/cars/new',
      },
    },
    revenues: {
      path: '/revenues',
      getHref: () => '/revenues',
       createBulk: {
        path: '/revenues/bulk',
        getHref: () => '/revenues/bulk',
      },
    },
    reports: {
      path: '/reports',
      getHref: () => '/reports',
    },

    flatrates: {
      path: '/flatrates',
      getHref: () => '/flatrates',
      create: {
        path: '/flatrates/new',
        getHref: () => '/flatrates/new',
      },
    },

    shifts: {
      path: '/shifts',
      getHref: () => '/shifts',
      view: {
        path: '/shifts/:shiftId',
        getHref: (shiftId: number | string) => `/shifts/${shiftId}`,
      },
      create: {
        path: '/shifts/new',
        getHref: () => '/shifts/new',
      },
    },

    settings: {
      path: '/settings',
      getHref: () => '/settings',
    },
  },
} as const;
