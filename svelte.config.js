import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    files: {
      assets: `static`,
    },
    alias: {
      '$shared/*': './src/lib/shared/*',
      $config: './src/app.config.ts',
      $configs: './src/configs/*',
      $const: './src/constants/index.ts',
      $mocks: './src/tests/mocks/index.ts',
      $abi: './src/abi/index.ts',
      '$fonts/*': './src/public/fonts/*',
      $chainConfig: './src/generated/chainConfig.ts',
      '$generated/*': './src/generated/*',
      // new below
      $domain: './src/domain/*',
      '$lib/*': './src/lib/*',
    },
  },
};

export default config;
