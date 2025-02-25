import lintConfig from '@contract-case/eslint-config-case-maintainer';

export default [
  ...lintConfig,
  {
    rules: {
      'max-classes-per-file': 'off',
      'import/extensions': 'off',
    },
  },
];
