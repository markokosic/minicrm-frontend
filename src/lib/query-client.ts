import { QueryClient } from '@tanstack/react-query';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});

export default queryClient;
