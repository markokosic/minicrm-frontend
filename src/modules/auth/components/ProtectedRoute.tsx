import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  const authData = localStorage.getItem('auth');
  const parsedAuth = authData ? JSON.parse(authData) : null;

  const isLoggedIn = parsedAuth && parsedAuth.authenticatedState === 1;

  if (!isLoggedIn)
    return (
      <Navigate
        to={paths.auth.login.getHref()}
        replace
      />
    );

  return children;
};
