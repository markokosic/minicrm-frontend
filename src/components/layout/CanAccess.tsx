import { ReactNode } from 'react';
import { UserResponseRoles } from '@/api/generated/model';
import { useHasRole } from '@/features/auth/hooks/useHasRole';

export interface CanAccessProps {
  roles?: UserResponseRoles[] | UserResponseRoles;
  children: ReactNode;
  fallback?: ReactNode;
}

export const CanAccess = ({
  roles,
  children,
  fallback = null,
}: CanAccessProps) => {
  const hasAccess = useHasRole(roles);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
1