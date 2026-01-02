import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { AppLayout } from '@/components/layout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Test } from '@/components/Test';
import { paths } from '@/config/paths';
import { CustomersPage } from './routes/app/CustomersPage';
import DashboardPage from './routes/app/DashboardPage';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: paths.auth.login.path,
        element: <LoginPage />,
      },
      {
        path: paths.auth.register.path,
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
