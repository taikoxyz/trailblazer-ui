import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import parser from 'svelte-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/.DS_Store',
      '**/node_modules',
      '**/coverage',
      'build',
      '.svelte-kit',
      'package',
      '**/.env',
      '**/.env.*',
      '!**/.env.example',
      'src/abi/*',
      '**/CHANGELOG.md',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
      'src/generated/*',
      '**/*.json',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        extraFileExtensions: ['.svelte'],
      },
    },

    rules: {
      'linebreak-style': ['error', 'unix'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.svelte'],

    rules: {
      'no-undef': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
