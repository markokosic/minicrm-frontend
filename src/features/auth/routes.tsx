import { lazy } from 'react';
import { ROUTES } from '@/config/routes';
import { AppRouteInterface } from '../../common/types/common-types';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));

const { auth } = ROUTES;

export const authRoutes: AppRouteInterface[] = [
  {
    path: auth.login.path,
    element: <LoginPage />,
  },
  {
    path: ROUTES.auth.register.path,
    element: <RegisterPage />,
  },
];
