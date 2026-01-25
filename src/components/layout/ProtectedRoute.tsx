import { Navigate } from 'react-router';
import { AppLayout } from '@/components/layout';
import { ROUTES } from '@/config/routes';
import { useUser } from '@/lib/auth';

export const ProtectedRoute = () => {
  const { status } = useUser();

  if (status === 'error') {
    return (
      <Navigate
        to={ROUTES.auth.login.path}
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
