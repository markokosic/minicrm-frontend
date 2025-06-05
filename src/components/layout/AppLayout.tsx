import { useUser } from '@/lib/auth';
import { Outlet } from 'react-router';

const AppLayout = () => {
  const user = useUser();
  return (
    <main className="bg-red-200">
      <Outlet />
    </main>
  );
};

export { AppLayout };
