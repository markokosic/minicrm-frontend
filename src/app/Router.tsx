import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { MainErrorFallback } from '@/components/errors/MainErrorFallback';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/config/routes';

// LAZY LOADED PAGES
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const DriversPage = lazy(() => import('@/features/drivers/pages/DriversPage'));
const DriverCreatePage = lazy(() => import('@/features/drivers/pages/DriverCreatePage'));
const DriverPage = lazy(() => import('@/features/drivers/pages/DriverPage'));
const CarsPage = lazy(() => import('@/features/cars/pages/CarsPage'));
const CarCreatePage = lazy(() => import('@/features/cars/pages/CarCreatePage'));
const CarPage = lazy(() => import('@/features/cars/pages/CarPage'));
const RevenuesPage = lazy(() => import('@/features/revenues/pages/RevenuesPage'));
const CreateDailyRevenuesPage = lazy(() => import('@/features/revenues/pages/CreateDailyRevenuesPage'));
const ReportPage = lazy(() => import('@/features/reports/pages/ReportPage'));

const router = createBrowserRouter([

  {
    errorElement: <MainErrorFallback />,
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
    errorElement: <MainErrorFallback />,
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to={ROUTES.app.dashboard.path} replace /> },
      { path: ROUTES.app.dashboard.path, element: <DashboardPage /> },
      // DRIVER PAGES
      { path: ROUTES.app.drivers.path, element: <DriversPage /> },
      { path: ROUTES.app.drivers.create.path, element: <DriverCreatePage /> },
      { path: ROUTES.app.drivers.view.path, element: <DriverPage /> },

      // CAR PAGES
      { path: ROUTES.app.cars.path, element: <CarsPage /> },
      { path: ROUTES.app.cars.create.path, element: <CarCreatePage /> },
      { path: ROUTES.app.cars.view.path, element: <CarPage /> },

      //REVENUES PAGES
      { path: ROUTES.app.revenues.path, element: <RevenuesPage /> },
      { path: ROUTES.app.revenues.createBulk.path, element: <CreateDailyRevenuesPage /> },

      //REPORTS PAGES
      { path: ROUTES.app.reports.path, element: <ReportPage /> },

      // SETTINGS PAGE
      { path: ROUTES.app.settings.path, element: <SettingsPage /> },

      // 404 NOT FOUND PAGE
      { path: '*', element: <div>Not found</div> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};


