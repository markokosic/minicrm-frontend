import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import { MANAGEMENT_ROLES } from '@/shared/constants';
import { AppRouteInterface } from '@/shared/types/common-types';

const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const DriverDashboardPage = lazy(() => import('./pages/driver/DriverDashboardPage'));

const { dashboard } = ROUTES.app;

export const dashboardRoutes: AppRouteInterface[] = [
  {
    path: dashboard.path,
    element: <DriverDashboardPage />,
    roles: [UserResponseRoles.DRIVER],
  },
  {
    path: dashboard.path,
    element: <AdminDashboardPage />,
    roles: MANAGEMENT_ROLES,
  },
];
