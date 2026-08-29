import { lazy } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { AppRouteInterface } from '@/common/types/common-types';
import { ROUTES } from '@/config/routes';

const UsersPage = lazy(() => import('./pages/UsersPage'));

const { users } = ROUTES.app;

export const userRoutes: AppRouteInterface[] = [
  {
    path: users.path,
    element: <UsersPage />,
    roles: [UserResponseRoles.ADMIN, UserResponseRoles.OWNER],
  },
];
