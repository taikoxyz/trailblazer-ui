// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  schema: process.env.PUBLIC_SUBGRAPH_URL,
  documents: 'src/libs/graphql/queries/**/*.ts',
  generates: {
    'src/libs/graphql/types/generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};
