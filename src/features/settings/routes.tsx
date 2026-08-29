import { lazy } from 'react';
import { ROUTES } from '@/config/routes';
import { AppRouteInterface } from '@/shared/types/common-types';

const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const { settings } = ROUTES.app;

export const settingsRoutes: AppRouteInterface[] = [
  {
    path: settings.path,
    element: <SettingsPage />,
  },
];
