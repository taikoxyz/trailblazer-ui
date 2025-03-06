import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

dotenv.config();

// Define an array of subgraph configurations
const subgraphs = [
  {
    name: 'taikoons',
    url: process.env.PUBLIC_TAIKOONS_SUBGRAPH_URL,
    outputDir: './src/generated/graphql/taikoons/',
  },
  {
    name: 'badges',
    url: process.env.PUBLIC_BADGES_SUBGRAPH_URL,
    outputDir: './src/generated/graphql/badges/',
  },
  {
    name: 'pfp',
    url: process.env.PUBLIC_PFP_SUBGRAPH_URL,
    outputDir: './src/generated/graphql/pfp/',
  },
  {
    name: 'fba',
    url: process.env.PUBLIC_FBA_SUBGRAPH_URL,
    outputDir: './src/generated/graphql/fba/',
  }
];

// Generates object to hold dynamic codegen configuration
const generates: CodegenConfig['generates'] = {};

// Loop through each subgraph and create codegen configuration dynamically
subgraphs.forEach(({ name, url, outputDir }) => {
  if (!url) {
    console.warn(`Missing URL for ${name} subgraph. Skipping codegen.`);
    return;
  }

  // Ensure the output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Assign the generates configuration for this subgraph
  generates[`${outputDir}index.ts`] = {
    schema: url,
    plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
    config: {
      clientPath: url, // The URL of the subgraph is treated as the client path
    },
  };

  // Write a module declaration file to prevent TypeScript errors
  writeFileSync(`${outputDir}types.d.ts`, `declare module "${url}";`);
});

// Final GraphQL Codegen configuration
const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates,
};

export default config;
