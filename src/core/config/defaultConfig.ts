import type { BaseCaseConfig } from './types';

export const DEFAULT_TEST_ID = 'GLOBAL_TEST_ID' as const;

export const DEFAULT_CONFIG: BaseCaseConfig = {
  logLevel: 'warn',
  contractDir: 'case-contracts',
  publish: 'ONLY_IN_CI',
  throwOnFail: true, // overridden by the setting in ContractVerifier
  printResults: true,
  testRunId: DEFAULT_TEST_ID,
};
