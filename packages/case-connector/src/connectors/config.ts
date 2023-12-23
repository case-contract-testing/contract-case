import { ContractCaseBoundaryConfig } from '@contract-case/case-boundary';
import { ContractCaseConnectorConfig } from '../domain/types';

export const mapConfig = (
  config: ContractCaseConnectorConfig,
  testRunId: string,
): ContractCaseBoundaryConfig => ({
  ...config,
  testRunId,
});

export const mapConfigNoId = (
  config: ContractCaseConnectorConfig,
): Omit<ContractCaseBoundaryConfig, 'testRunId'> => ({
  ...config,
});
