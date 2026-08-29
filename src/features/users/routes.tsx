import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import { AppRouteInterface } from '@/shared/types/common-types';

const UsersPage = lazy(() => import('./pages/UsersPage'));

const { users } = ROUTES.app;

export const userRoutes: AppRouteInterface[] = [
  {
    path: users.path,
    element: <UsersPage />,
    roles: [UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
];
