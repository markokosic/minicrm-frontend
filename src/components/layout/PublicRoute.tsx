import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/features/auth';

export const PublicRoute = () => {
  const { user, isAuthenticated, isPending } = useAuth();

  if (isPending) {
    return null;
  }

  if (isAuthenticated && user) {
    if (user.mustChangePassword) {
      return <Navigate to={ROUTES.auth.changePassword.path} replace />;
    }
    return <Navigate to={ROUTES.app.dashboard.path} replace />;
  }

  return <Outlet />;
};
