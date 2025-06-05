import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-base-100 px-4 ">
      <Outlet />
    </main>
  );
};

export { AuthLayout };
