import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/config/routes';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import { CustomerCreatePage } from '../../_ARCHIVE/customers/pages/CustomerCreatePage';
import { CustomerEditPage } from '../../_ARCHIVE/customers/pages/CustomerEditPage';
import { CustomersPage } from '../../_ARCHIVE/customers/pages/CustomersPage';
import { CustomerViewPage } from '../../_ARCHIVE/customers/pages/CustomerViewPage';
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
      // { path: ROUTES.app.customers.path, element: <CustomersPage /> },
      {
        index: true,
        path: '/customers/:customerId',
        element: (
          <Navigate
            to="general"
            replace
          />
        ),
      },
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
