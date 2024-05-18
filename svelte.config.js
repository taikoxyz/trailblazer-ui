import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    // https://kit.svelte.dev/docs/single-page-apps
    adapter: adapter({
      fallback: 'index.html',
    }),
    alias: {
      '$components/*': './src/components/*',
      '$stores/*': './src/stores/*',
      $stores: './src/stores/index.ts',
      $config: './src/app.config.ts',
      $configs: './src/configs/*',
      $const: './src/constants/index.ts',
      '$libs/*': './src/libs/*',
      $types: './src/types/index.ts',
      $mocks: './src/tests/mocks/index.ts',
      $abi: './src/abi/index.ts',
      '$images/*': './src/public/images/*',
      '$fonts/*': './src/public/fonts/*',
      $chainConfig: './src/generated/chainConfig.ts',
      $customToken: './src/generated/customTokenConfig.ts',
      $i18n: './src/i18n/index.ts',
    },
    prerender: {
      crawl: true, // Automatically discover and prerender linked routes
      entries: ['*'], // Specify entries to prerender; '*' means all routes
    },
  },
};

export default config;
