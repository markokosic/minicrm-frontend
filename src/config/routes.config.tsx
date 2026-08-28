import { lazy, ReactNode } from 'react';
import type { RouteObject } from 'react-router';
import { UserResponseRoles } from '@/api/generated/model';
import { ROUTES } from './routes';

// LAZY LOADED PAGES
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const DriverDashboardPage = lazy(
  () => import('@/features/driver-dashboard/pages/DriverDashboardPage')
);
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const DriversPage = lazy(() => import('@/features/drivers/pages/DriversPage'));
const DriverCreatePage = lazy(() => import('@/features/drivers/pages/DriverCreatePage'));
const DriverViewPage = lazy(() => import('@/features/drivers/pages/DriverViewPage'));
const DriverEditPage = lazy(() => import('@/features/drivers/pages/DriverEditPage'));
const CarsPage = lazy(() => import('@/features/cars/pages/CarsPage'));
const CarCreatePage = lazy(() => import('@/features/cars/pages/CarCreatePage'));
const CarPage = lazy(() => import('@/features/cars/pages/CarPage'));
const ReportPage = lazy(() => import('@/features/reports/pages/ReportPage'));
const CreateNewFlatRatePage = lazy(
  () => import('@/features/flatrates/pages/CreateNewFlatRatePage')
);
const FlatRatesPage = lazy(() => import('@/features/flatrates/pages/FlatRatesPage'));
const ShiftsPage = lazy(() => import('@/features/shifts/pages/ShiftsPage'));
const CreateShiftPage = lazy(() => import('@/features/shifts/pages/CreateShiftPage'));
const EditShiftPage = lazy(() => import('@/features/shifts/pages/EditShiftPage'));
const ShiftViewPage = lazy(() => import('@/features/shifts/pages/ShiftViewPage'));
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage'));

export interface AppRouteConfig {
  path: string;
  element: ReactNode;
  roles?: UserResponseRoles[];
}

export const APP_ROUTES: AppRouteConfig[] = [
  // --- DASHBOARD ---
  {
    path: ROUTES.app.dashboard.path,
    element: <DriverDashboardPage />,
    roles: [UserResponseRoles.DRIVER],
  },
  {
    path: ROUTES.app.dashboard.path,
    element: <DashboardPage />,
    roles: [UserResponseRoles.ADMIN, UserResponseRoles.OWNER, UserResponseRoles.BACKOFFICE],
  },

  // --- SCHICHTEN ---
  {
    path: ROUTES.app.shifts.path,
    element: <ShiftsPage />,
    roles: [
      UserResponseRoles.DRIVER,
      UserResponseRoles.BACKOFFICE,
      UserResponseRoles.ADMIN,
      UserResponseRoles.OWNER,
    ],
  },
  {
    path: ROUTES.app.shifts.view.path,
    element: <ShiftViewPage />,
    roles: [
      UserResponseRoles.DRIVER,
      UserResponseRoles.BACKOFFICE,
      UserResponseRoles.ADMIN,
      UserResponseRoles.OWNER,
    ],
  },
  {
    path: ROUTES.app.shifts.create.path,
    element: <CreateShiftPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.shifts.edit.path,
    element: <EditShiftPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },

  // --- FAHRER-VERWALTUNG ---
  {
    path: ROUTES.app.drivers.path,
    element: <DriversPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.drivers.create.path,
    element: <DriverCreatePage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.drivers.view.path,
    element: <DriverViewPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.drivers.edit.path,
    element: <DriverEditPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },

  // --- FUHRPARK / FAHRZEUGE ---
  {
    path: ROUTES.app.cars.path,
    element: <CarsPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.cars.create.path,
    element: <CarCreatePage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.cars.view.path,
    element: <CarPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },

  // --- BERICHTE ---
  {
    path: ROUTES.app.reports.path,
    element: <ReportPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },

  // --- PAUSCHALEN / FLATRATES ---
  {
    path: ROUTES.app.flatrates.path,
    element: <FlatRatesPage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
  {
    path: ROUTES.app.flatrates.create.path,
    element: <CreateNewFlatRatePage />,
    roles: [UserResponseRoles.BACKOFFICE, UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },

  // --- BENUTZERVERWALTUNG ---
  {
    path: ROUTES.app.users.path,
    element: <UsersPage />,
    roles: [UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },

  // --- EINSTELLUNGEN (Für alle Rollen offen) ---
  {
    path: ROUTES.app.settings.path,
    element: <SettingsPage />,
  },
];

export const isRouteAllowedForRole = (path: string, role?: UserResponseRoles): boolean => {
  const matchingRoutes = APP_ROUTES.filter((r) => r.path === path);
  if (matchingRoutes.length === 0) return true;

  return matchingRoutes.some((r) => {
    if (!r.roles || r.roles.length === 0) return true;
    return role ? r.roles.includes(role) : false;
  });
};


export const getRoutesForRole = (role?: UserResponseRoles): RouteObject[] => {
  return APP_ROUTES.filter((route) => {
    if (!route.roles || route.roles.length === 0) return true;
    return role ? route.roles.includes(role) : false;
  }).map(({ path, element }) => ({ path, element }));
};
