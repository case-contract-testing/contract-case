import type { BaseCaseConfig } from './types';

export const DEFAULT_TEST_ID = 'GLOBAL_TEST_ID' as const;

export const DEFAULT_CONFIG: BaseCaseConfig = {
  logLevel: 'info',
  contractDir: 'case-contracts',
  testRunId: DEFAULT_TEST_ID,
};
