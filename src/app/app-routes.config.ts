import type { RouteObject } from 'react-router';
import { UserResponseRoles } from '@/api/generated/model';
import { carRoutes } from '@/features/cars/routes';
import { dashboardRoutes } from '@/features/dashboard/routes';
import { driverRoutes } from '@/features/drivers/routes';
import { flatrateRoutes } from '@/features/flatrates/routes';
import { reportRoutes } from '@/features/reports/routes';
import { settingsRoutes } from '@/features/settings/routes';
import { shiftRoutes } from '@/features/shifts/routes';
import { userRoutes } from '@/features/users/routes';
import { AppRouteInterface } from '@/shared/types/common-types';

export const APP_ROUTES: AppRouteInterface[] = [
  ...dashboardRoutes,
  ...shiftRoutes,
  ...carRoutes,
  ...driverRoutes,
  ...flatrateRoutes,
  ...reportRoutes,
  ...userRoutes,
  ...settingsRoutes,
];

export const isRouteAllowedForRole = (path: string, role?: UserResponseRoles): boolean => {
  const matchingRoutes = APP_ROUTES.filter((r) => r.path === path);
  if (matchingRoutes.length === 0) {
    return true;
  }

  return matchingRoutes.some((r) => {
    if (!r.roles || r.roles.length === 0) {
      return true;
    }
    return role ? r.roles.includes(role) : false;
  });
};

export const getRoutesForRole = (role?: UserResponseRoles): RouteObject[] => {
  return APP_ROUTES.filter((route) => {
    if (!route.roles || route.roles.length === 0) {
      return true;
    }
    return role ? route.roles.includes(role) : false;
  }).map(({ path, element }) => ({ path, element }));
};
