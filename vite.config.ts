import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';
import tsconfigPaths from 'vite-tsconfig-paths';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './.env.test' });
}

export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    watch: {
      followSymlinks: false,
    },
  },
  esbuild: {
    sourcemap: true,
  },
  plugins: [
    qrcode(),
    sveltekit(), // This plugin gives vite the ability to resolve imports using TypeScript's path mapping.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths({ ignoreConfigErrors: true }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./**/*.{test,spec}.{js,ts}'],
  },
});
