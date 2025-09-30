import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'http://localhost:8080/index.php?graphql=true',
  documents: ['src/**/*.graphql', 'src/**/*.ts', 'src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    'src/gql/graphql-request.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ],
      config: {
        rawRequest: false,
        inlineFragmentTypes: 'combine',
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
}

export default config