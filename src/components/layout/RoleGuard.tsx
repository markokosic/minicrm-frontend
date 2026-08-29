import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { UserResponseRoles } from '@/api/generated/model';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useHasRole } from '@/features/auth/hooks/useHasRole';

export interface RoleGuardProps {
  allowedRoles: UserResponseRoles[] | UserResponseRoles;
  redirectTo?: string;
  children?: ReactNode;
}

export const RoleGuard = ({
  allowedRoles,
  redirectTo = ROUTES.app.dashboard.path,
  children,
}: RoleGuardProps) => {
  const { user, isPending } = useAuth();
  const hasAccess = useHasRole(allowedRoles);

  if (isPending) {
    return null;
  }

  if (!user) {
    return (
      <Navigate
        to={ROUTES.auth.login.path}
        replace
      />
    );
  }

  if (!hasAccess) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return children ? <>{children}</> : <Outlet />;
};
