import { lazy } from 'react';
import { ROUTES } from '@/config/routes';
import { MANAGEMENT_ROLES } from '@/shared/constants';
import { AppRouteInterface } from '@/shared/types/common-types';

const ReportPage = lazy(() => import('./pages/ReportPage'));

const { reports } = ROUTES.app;

export const reportRoutes: AppRouteInterface[] = [
  {
    path: reports.path,
    element: <ReportPage />,
    roles: MANAGEMENT_ROLES,
  },
];
