import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { theme } from '@/config/theme';
import i18n from '@/lib/i18n/i18n';

export const createTestAppWrapper = (initialRoute: string = '/') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <MemoryRouter initialEntries={[initialRoute]}>
            {/* <I18nextProvider i18n={i18n}></I18nextProvider> */}
            {children}
          </MemoryRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );

  return { Wrapper, queryClient };
};
