import type { RouteObject } from 'react-router';
import { UserResponseRoles } from '@/api/generated/model';
import { APP_ROUTES } from '../config/routes.config';

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
