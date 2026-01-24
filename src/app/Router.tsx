import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/config/routes';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import { CustomerAddPage } from '../features/customers/pages/CustomerAddPage';
import { CustomerEditPage } from '../features/customers/pages/CustomerEditPage';
import { CustomersPage } from '../features/customers/pages/CustomersPage';
import { CustomerViewPage } from '../features/customers/pages/CustomerViewPage';
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
      { path: ROUTES.app.customers.path, element: <CustomersPage /> },
      { path: ROUTES.app.customers.view.path, element: <CustomerViewPage /> },
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
