import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/config/routes';
import { CustomerAddPage } from './routes/app/CustomerAddPage';
import { CustomerEditPage } from './routes/app/CustomerEditPage';
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
      // CUSTOMER PAGES
      { path: ROUTES.app.customers.path, element: <CustomersPage /> },
      { path: ROUTES.app.customers.detail.path, element: <CustomerPage /> },
      { path: ROUTES.app.customers.add.path, element: <CustomerAddPage /> },
      { path: ROUTES.app.customers.edit.path, element: <CustomerEditPage /> },

      // 404 NOT FOUND PAGE
      { path: '*', element: <div>Not found</div> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter };
