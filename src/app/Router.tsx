import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/config/routes';
import { DriversPage } from '@/features/drivers/pages/DriversPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardPage from './routes/app/DashboardPage';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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

  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      // CUSTOMER PAGES
      { path: ROUTES.app.drivers.path, element: <DriversPage /> },
      // {
      //   index: true,
      //   path: '/drivers/:driverId',
      //   element: (
      //     <Navigate
      //       to="general"
      //       replace
      //     />
      //   ),
      // },
      // { path: ROUTES.app.customers.view.path, element: <CustomerViewPage /> },
      // { path: ROUTES.app.customers.add.path, element: <CustomerCreatePage /> },
      // { path: ROUTES.app.customers.edit.path, element: <CustomerEditPage /> },
      // { path: ROUTES.app.customers.edit.path, element: <CustomerEditPage /> },

      // 404 NOT FOUND PAGE
      { path: '*', element: <div>Not found</div> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter };
