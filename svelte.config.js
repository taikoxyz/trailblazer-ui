import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    files: {
      assets: 'static',
    },
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
      '$fonts/*': './src/public/fonts/*',
      $chainConfig: './src/generated/chainConfig.ts',
      $customToken: './src/generated/customTokenConfig.ts',
      '$generated/*': './src/generated/*',
    },
  },
};

export default config;
