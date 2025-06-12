import { Outlet } from 'react-router';
import LanguageSwitcher from '../translation/LanguageSwitcher';

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-base-100 px-4 ">
      <LanguageSwitcher />
      <Outlet />
    </main>
  );
};

export { AuthLayout };
