import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { AppRouteInterface } from '@/common/types/common-types';
import { carRoutes } from '@/features/cars/routes';
import { dashboardRoutes } from '@/features/dashboard/routes';
import { driverRoutes } from '@/features/drivers/routes';
import { flatrateRoutes } from '@/features/flatrates/routes';
import { shiftRoutes } from '@/features/shifts/routes';
import { ROUTES } from './routes';

// LAZY LOADED PAGES
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const ReportPage = lazy(() => import('@/features/reports/pages/ReportPage'));
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage'));

export const APP_ROUTES: AppRouteInterface[] = [
  // --- DASHBOARD (MODUL) ---
  ...dashboardRoutes,

  // --- SCHICHTEN (MODUL) ---
  ...shiftRoutes,

  // --- FUHRPARK / FAHRZEUGE (MODUL) ---
  ...carRoutes,

  // --- FAHRER-VERWALTUNG (MODUL) ---
  ...driverRoutes,

  // --- PAUSCHALEN / FLATRATES (MODUL) ---
  ...flatrateRoutes,

  // --- BERICHTE ---
  {
    path: ROUTES.app.reports.path,
    element: <ReportPage />,
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
