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
const DriverViewPage = lazy(() => import('@/features/drivers/pages/DriverViewPage'));
const DriverEditPage = lazy(() => import('@/features/drivers/pages/DriverEditPage'));
const CarsPage = lazy(() => import('@/features/cars/pages/CarsPage'));
const CarCreatePage = lazy(() => import('@/features/cars/pages/CarCreatePage'));
const CarPage = lazy(() => import('@/features/cars/pages/CarPage'));
const ReportPage = lazy(() => import('@/features/reports/pages/ReportPage'));
const CreateNewFlatRatePage = lazy(() => import('@/features/flatrates/pages/CreateNewFlatRatePage'));
const FlatRatesPage = lazy(() => import('@/features/flatrates/pages/FlatRatesPage'));
const ShiftsPage = lazy(() => import('@/features/shifts/pages/ShiftsPage'));
const CreateShiftPage = lazy(() => import('@/features/shifts/pages/CreateShiftPage'));
const EditShiftPage = lazy(() => import('@/features/shifts/pages/EditShiftPage'));
const ShiftViewPage = lazy(() => import('@/features/shifts/pages/ShiftViewPage'));
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage'));

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
      { path: ROUTES.app.drivers.view.path, element: <DriverViewPage /> },
      { path: ROUTES.app.drivers.edit.path, element: <DriverEditPage /> },

      // CAR PAGES
      { path: ROUTES.app.cars.path, element: <CarsPage /> },
      { path: ROUTES.app.cars.create.path, element: <CarCreatePage /> },
      { path: ROUTES.app.cars.view.path, element: <CarPage /> },

      //REPORTS PAGES
      { path: ROUTES.app.reports.path, element: <ReportPage /> },

      // FLATRATE PAGES
      { path: ROUTES.app.flatrates.path, element: <FlatRatesPage /> },
      { path: ROUTES.app.flatrates.create.path, element: <CreateNewFlatRatePage /> },

      // SHIFTS PAGES
      { path: ROUTES.app.shifts.path, element: <ShiftsPage /> },
      { path: ROUTES.app.shifts.create.path, element: <CreateShiftPage /> },
      { path: ROUTES.app.shifts.edit.path, element: <EditShiftPage /> },
      { path: ROUTES.app.shifts.view.path, element: <ShiftViewPage /> },

      // USERS PAGE
      { path: ROUTES.app.users.path, element: <UsersPage /> },

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


