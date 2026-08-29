import { lazy } from 'react';
import { ROUTES } from '@/config/routes';
import { MANAGEMENT_ROLES } from '@/shared/constants';
import { AppRouteInterface } from '@/shared/types/common-types';

const FlatRatesPage = lazy(() => import('./pages/FlatRatesPage'));
const CreateNewFlatRatePage = lazy(() => import('./pages/CreateNewFlatRatePage'));

const { flatrates } = ROUTES.app;

export const flatrateRoutes: AppRouteInterface[] = [
  {
    path: flatrates.path,
    element: <FlatRatesPage />,
    roles: MANAGEMENT_ROLES,
  },
  {
    path: flatrates.create.path,
    element: <CreateNewFlatRatePage />,
    roles: MANAGEMENT_ROLES,
  },
];
