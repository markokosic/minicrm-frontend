import { lazy } from 'react';
import { MANAGEMENT_ROLES } from '@/common/constants';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

const CarsPage = lazy(() => import('./pages/CarsPage'));
const CarCreatePage = lazy(() => import('./pages/CarCreatePage'));
const CarPage = lazy(() => import('./pages/CarPage'));

const { cars } = ROUTES.app;

export const carRoutes: AppRouteInterface[] = [
  {
    path: cars.path,
    element: <CarsPage />,
    roles: MANAGEMENT_ROLES,
  },
  {
    path: cars.create.path,
    element: <CarCreatePage />,
    roles: MANAGEMENT_ROLES,
  },
  {
    path: cars.view.path,
    element: <CarPage />,
    roles: MANAGEMENT_ROLES,
  },
];
