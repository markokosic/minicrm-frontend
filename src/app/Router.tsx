import { createBrowserRouter, RouterProvider } from 'react-router';

import { Test } from '@/components/Test';
import { paths } from '@/config/paths';
import { AuthLayout } from '@/components/layout/AuthLayout';
import DashboardPage from './routes/app/DashboardPage';
import { AppLayout } from '@/components/layout';
import LoginPage from './routes/auth/LoginPage';
import { ProtectedRoute } from '@/modules/auth/components';
import { CustomersPage } from './routes/app/CustomersPage';

const router = createBrowserRouter([
  {
    path: paths.auth.root.path,
    element: <AuthLayout />,
    children: [
      {
        path: paths.auth.login.path,
        element: <LoginPage />,
      },
      // {
      //   path: paths.auth.register.path,
      //   element: <Register />,
      // },
    ],
  },

  {
    path: paths.app.root.path,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: paths.app.customers.path, element: <CustomersPage /> },
      { path: '*', element: <div>Not found</div> },
      // { path: 'about', element: <Test /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter };
