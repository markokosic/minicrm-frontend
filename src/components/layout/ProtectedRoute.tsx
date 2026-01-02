import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AppLayout } from '@/components/layout';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: user, status } = useUser();

  if (status === 'error') {
    return (
      <Navigate
        to={paths.auth.login.path}
        replace
      />
    );
  }

  if (status === 'pending') {
    return <AppLayout overlayVisible={true} />;
  }

  if (status === 'success') {
    return <AppLayout overlayVisible={false} />;
  }
};
