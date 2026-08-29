import { lazy } from 'react';
import { MANAGEMENT_ROLES } from '@/common/constants';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

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
