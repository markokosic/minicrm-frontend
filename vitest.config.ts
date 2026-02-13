import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: './src/testing/setupTests.ts',
    // coverage: {
    //   provider: 'c8',
    //   reporter: ['text', 'lcov', 'html'],
    //   all: true,
    // },
  },
});
