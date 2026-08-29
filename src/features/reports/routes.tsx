import { lazy } from 'react';
import { MANAGEMENT_ROLES } from '@/common/constants';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

const ReportPage = lazy(() => import('./pages/ReportPage'));

const { reports } = ROUTES.app;

export const reportRoutes: AppRouteInterface[] = [
  {
    path: reports.path,
    element: <ReportPage />,
    roles: MANAGEMENT_ROLES,
  },
];
