import { Navigate } from 'react-router';
import { AppLayout } from '@/components/layout';
import { routes } from '@/config/routes';
import { useUser } from '@/lib/auth';

export const ProtectedRoute = () => {
  const { status } = useUser();

  if (status === 'error') {
    return (
      <Navigate
        to={routes.auth.login.path}
        replace
      />
    );
  }

  if (status === 'pending') {
    return <AppLayout overlayVisible />;
  }

  if (status === 'success') {
    return <AppLayout overlayVisible={false} />;
  }
};
