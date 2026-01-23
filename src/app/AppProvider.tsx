import '@mantine/core/styles.css';

import { Suspense, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from '@mantine/core';
import { MainErrorFallback } from '@/components/errors/main';
import { theme } from '@/config/theme';
import queryClient from '@/lib/queryClient';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [showDevtools, setShowDevtools] = useState(false);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">loading...</div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            {children}
            <Toaster position="bottom-right" />
            {showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
          </MantineProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export { AppProvider };
