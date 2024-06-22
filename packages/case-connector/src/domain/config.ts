import { ContractCaseConnectorConfig } from './types.js';
import { ContractCaseBoundaryConfig } from '../entities/types.js';

export const mapConfig = (
  config: ContractCaseConnectorConfig,
  testRunId: string,
): ContractCaseBoundaryConfig => ({
  ...config,
  testRunId,
  internals: {
    asyncVerification: true,
  },
});

export const mapConfigNoId = (
  config: ContractCaseConnectorConfig,
): Omit<ContractCaseBoundaryConfig, 'testRunId'> => ({
  ...config,
  internals: {
    asyncVerification: true,
  },
});
