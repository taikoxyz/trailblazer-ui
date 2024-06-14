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
      $components: path.resolve(__dirname, './src/components'),
      $stores: path.resolve(__dirname, './src/stores'),
      $libs: path.resolve(__dirname, './src/libs'),
      $abi: path.resolve(__dirname, './src/abi/index.ts'),
      $chainConfig: path.resolve(__dirname, './src/generated/chainConfig.ts'),
      $customToken: path.resolve(__dirname, './src/generated/customTokenConfig.ts'),
      $mocks: path.resolve(__dirname, './src/tests/mocks/index.ts'),
      '$env/static/public': path.resolve(__dirname, './__mocks__/$env/static/public.ts'),
    },
  },
});
