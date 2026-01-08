import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { routes } from '@/config/routes';
import { CustomersPage } from './routes/app/CustomersPage';
import DashboardPage from './routes/app/DashboardPage';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.auth.login.path,
        element: <LoginPage />,
      },
      {
        path: routes.auth.register.path,
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
      { path: routes.app.customers.path, element: <CustomersPage /> },
      { path: '*', element: <div>Not found</div> },
      // { path: 'about', element: <Test /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter };
