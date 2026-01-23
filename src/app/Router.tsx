import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/config/routes';
import { CustomerPage } from './routes/app/CustomerPage';
import { CustomersPage } from './routes/app/CustomersPage';
import DashboardPage from './routes/app/DashboardPage';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';

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
      { path: ROUTES.app.customers.path, element: <CustomersPage /> },
      { path: ROUTES.app.customers.detail.path, element: <CustomerPage /> },
      { path: '*', element: <div>Not found</div> },
      // { path: 'about', element: <Test /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter };
