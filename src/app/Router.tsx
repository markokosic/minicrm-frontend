import { lazy, useMemo } from 'react';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router';
import { UserResponseRoles } from '@/api/generated/model';
import { getRoutesForRole } from '@/common/routes.utils';
import { MainErrorFallback } from '@/components/errors/MainErrorFallback';
import { AuthLayout, ProtectedRoute, PublicRoute } from '@/components/layout';
import { ROUTES } from '@/config/routes';
import { useUserRole } from '@/features/auth';

// AUTH PAGES
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ChangePasswordPage = lazy(() => import('@/features/auth/pages/ChangePasswordPage'));

interface GetRoutesParams {
  role?: UserResponseRoles;
  mustChangePassword?: boolean;
}

const getRoutes = ({ role, mustChangePassword }: GetRoutesParams): RouteObject[] => {
  if (mustChangePassword) {
    return [
      {
        errorElement: <MainErrorFallback />,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.auth.changePassword.path,
            element: <ChangePasswordPage />,
          },
          {
            path: '*',
            element: (
              <Navigate
                to={ROUTES.auth.changePassword.path}
                replace
              />
            ),
          },
        ],
      },
    ];
  }

  const protectedRoutes = getRoutesForRole(role);

  return [
    {
      errorElement: <MainErrorFallback />,
      element: <AuthLayout />,
      children: [
        {
          element: <PublicRoute />,
          children: [
            {
              path: ROUTES.auth.login.path,
              element: <LoginPage />,
            },
            {
              path: ROUTES.auth.register.path,
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },

    {
      errorElement: <MainErrorFallback />,
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: (
            <Navigate
              to={ROUTES.app.dashboard.path}
              replace
            />
          ),
        },
        ...protectedRoutes,
        { path: '*', element: <div>Not found</div> },
      ],
    },
  ];
};

export const AppRouter = () => {
  const { role, mustChangePassword } = useUserRole();

  const router = useMemo(() => {
    const routes = getRoutes({ role, mustChangePassword });
    return createBrowserRouter(routes);
  }, [role, mustChangePassword]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
