import { MainErrorFallback } from '@/components/errors/main';
import queryClient from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">loading...</div>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export { AppProvider };
