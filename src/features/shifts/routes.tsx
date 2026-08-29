import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import { MANAGEMENT_ROLES } from '@/shared/constants';
import { AppRouteInterface } from '@/shared/types/common-types';

const AdminShiftsPage = lazy(() => import('./pages/admin/AdminShiftsPage'));
const DriverShiftsPage = lazy(() => import('./pages/driver/DriverShiftsPage'));
const AdminCreateShiftPage = lazy(() => import('./pages/admin/AdminCreateShiftPage'));
const DriverCreateShiftPage = lazy(() => import('./pages/driver/DriverCreateShiftPage'));
const AdminEditShiftPage = lazy(() => import('./pages/admin/AdminEditShiftPage'));
const ShiftViewPage = lazy(() => import('./pages/admin/AdminViewShiftPage'));

const { shifts } = ROUTES.app;

export const shiftRoutes: AppRouteInterface[] = [
  // --- ÜBERSICHTEN (/shifts) ---
  {
    path: shifts.path,
    element: <DriverShiftsPage />,
    roles: [UserResponseRoles.DRIVER],
  },
  {
    path: shifts.path,
    element: <AdminShiftsPage />,
    roles: MANAGEMENT_ROLES,
  },

  // --- ERSTELLEN (/shifts/create) ---
  {
    path: shifts.create.path,
    element: <DriverCreateShiftPage />,
    roles: [UserResponseRoles.DRIVER],
  },
  {
    path: shifts.create.path,
    element: <AdminCreateShiftPage />,
    roles: MANAGEMENT_ROLES,
  },

  // --- BEARBEITEN (/shifts/:id/edit) ---
  {
    path: shifts.edit.path,
    element: <AdminEditShiftPage />,
    roles: MANAGEMENT_ROLES,
  },

  // --- DETAILS (/shifts/:id) ---
  {
    path: shifts.view.path,
    element: <ShiftViewPage />,
    roles: [UserResponseRoles.DRIVER, ...MANAGEMENT_ROLES],
  },
];
