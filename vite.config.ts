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
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.API_BASE_URL': JSON.stringify(process.env.PUBLIC_TRAILBLAZER_API_URL),
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
    include: ['./src/**/*.{test,spec}.{js,ts}'],
  },
});
