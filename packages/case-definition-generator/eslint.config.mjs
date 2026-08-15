import lintConfig from '@contract-case/eslint-config-case-maintainer';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(['test-fixtures/'], 'Ignore test fixture packages'),
  ...lintConfig,
];
