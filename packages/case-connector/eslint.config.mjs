import lintConfig from '@contract-case/eslint-config-case-maintainer';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(
    ['cjs.js', 'rename-inner-webpack-vars-loader.cjs'],
    'Ignore CJS node entry point and webpack loader',
  ),
  ...lintConfig,
  {
    rules: {
      'max-classes-per-file': 'off',
      'import/extensions': 'off',
    },
  },
];
