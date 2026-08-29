import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { shiftRoutes } from '@/features/shifts/routes';
import { AppRouteConfig } from '@/types/routes.types';
import { ROUTES } from './routes';

export type { AppRouteConfig };

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
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage'));

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

  // --- SCHICHTEN (MODUL) ---
  ...shiftRoutes,

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
