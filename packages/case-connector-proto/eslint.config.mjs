import lintConfig from '@contract-case/eslint-config-case-maintainer';

export default [
  {
    ignores: ['**/*.js'],
  },
  ...lintConfig,
  {
    // This barrel re-exports the generated protobuf declarations, each module
    // both as `export *` and as `export type *`. import-x resolves those to the
    // `.d.ts` files and, unlike eslint-plugin-import, then counts the type
    // re-export as a duplicate and asks for an explicit extension.
    files: ['src/index.d.ts'],
    rules: {
      'import-x/export': 'off',
      'import-x/extensions': 'off',
    },
  },
  {
    ignores: ['**/*.js'],
  },
];
