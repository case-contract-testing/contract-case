import lintConfig from '@contract-case/eslint-config-case-maintainer';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(
    ['cjs.js', 'rename-inner-webpack-vars-loader.cjs', 'test-fixtures/'],
    'Ignore CJS node entry point, webpack loader, and test fixture packages',
  ),
  ...lintConfig,
  {
    rules: {
      'max-classes-per-file': 'off',
      'import/extensions': 'off',
    },
  },
];
