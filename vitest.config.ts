import path from 'path';
import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    environment: 'jsdom',
    // setupFiles: ['./../../setup.ts'],
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    include: ['./**/*.{test,spec}.{js,ts}'],
  },
  resolve: {
    alias: {
      '$shared/*': path.resolve(__dirname, './src/lib/shared/*'),
      '$images/*': path.resolve(__dirname, './src/public/images/*'),
      '$lib/*': path.resolve(__dirname, './src/lib/*'),
      $abi: path.resolve(__dirname, './src/abi/index.ts'),
      '$mocks/*': path.resolve(__dirname, './src/tests/mocks/*'),
      $config: path.resolve(__dirname, './src/app.config.ts'),
      '$generated/*': path.resolve(__dirname, './src/generated/*'),
      '$app/environment': path.resolve(__dirname, './__mocks__/$app/environment/browser.ts'),
      '$env/static/public': path.resolve(__dirname, './__mocks__/$env/static/public.ts'),
      '$fonts/*': path.resolve(__dirname, './src/public/fonts/*'),
      '$domain/*': path.resolve(__dirname, './src/domain/*'),
      '$configs/*': path.resolve(__dirname, './src/configs/*'),
      $const: path.resolve(__dirname, './src/constants/index.ts'),
      $chainConfig: path.resolve(__dirname, './src/generated/chainConfig.ts'),
    },
  },
});
