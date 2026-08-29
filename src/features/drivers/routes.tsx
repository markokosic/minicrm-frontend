import { lazy } from 'react';
import { MANAGEMENT_ROLES } from '@/common/constants';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

const DriversPage = lazy(() => import('./pages/DriversPage'));
const DriverCreatePage = lazy(() => import('./pages/DriverCreatePage'));
const DriverViewPage = lazy(() => import('./pages/DriverViewPage'));
const DriverEditPage = lazy(() => import('./pages/DriverEditPage'));

const { drivers } = ROUTES.app;

export const driverRoutes: AppRouteInterface[] = [
  {
    path: drivers.path,
    element: <DriversPage />,
    roles: MANAGEMENT_ROLES,
  },
  {
    path: drivers.create.path,
    element: <DriverCreatePage />,
    roles: MANAGEMENT_ROLES,
  },
  {
    path: drivers.view.path,
    element: <DriverViewPage />,
    roles: MANAGEMENT_ROLES,
  },
  {
    path: drivers.edit.path,
    element: <DriverEditPage />,
    roles: MANAGEMENT_ROLES,
  },
];
