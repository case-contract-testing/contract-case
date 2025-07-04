import lintConfig from '@contract-case/eslint-config-case-maintainer';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(['cjs.js'], 'Ignore CJS node entry point'),
  ...lintConfig,
  {
    rules: {
      'max-classes-per-file': 'off',
      'import/extensions': 'off',
    },
  },
];
