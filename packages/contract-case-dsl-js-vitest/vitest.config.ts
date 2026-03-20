import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      provider: 'v8',
    },
    environment: 'node',
    include: [
      'src/**/*.{test,spec}.{js,ts}',
      'src/**/*.spec.verify.ts',
    ],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
