import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { MANAGEMENT_ROLES } from '@/common/constants';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

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
