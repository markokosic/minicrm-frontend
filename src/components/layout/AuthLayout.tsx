import { Outlet } from 'react-router';
import LanguageSwitcher from '../translation/LanguageSwitcher';
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { Stack } from '@mantine/core';

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-base-100 px-4 ">
      <Stack></Stack>

      <LanguageSwitcher />
      <LanguagePicker />
      <Outlet />
    </main>
  );
};

export { AuthLayout };
