import { lazy } from 'react';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const { settings } = ROUTES.app;

export const settingsRoutes: AppRouteInterface[] = [
  {
    path: settings.path,
    element: <SettingsPage />,
  },
];
