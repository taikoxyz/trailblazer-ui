import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';

dotenv.config();

const config: CodegenConfig = {
  schema: process.env.PUBLIC_SUBGRAPH_URL,
  ignoreNoDocuments: true,
  generates: {
    './src/generated/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
      config: {
        clientPath: process.env.PUBLIC_SUBGRAPH_URL,
      },
    },
  },
};
export default config;

writeFileSync('./src/generated/graphql/types.d.ts', `declare module "${process.env.PUBLIC_SUBGRAPH_URL}"`);
