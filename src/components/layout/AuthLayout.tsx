import { Outlet } from 'react-router';
import { LanguagePicker } from '@/components/ui/LanguagePicker';

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-base-100 px-4 gap-4 ">
      <Outlet />
      <LanguagePicker />
    </main>
  );
};

export { AuthLayout };
