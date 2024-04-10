import { ContractCaseConnectorConfig } from './types';
import { ContractCaseBoundaryConfig } from '../entities/types';

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
