import { ContractCaseBoundaryConfig } from '@contract-case/case-boundary';
import { ContractCaseConnectorConfig } from '../domain/types';

export const mapConfig = (
  config: ContractCaseConnectorConfig,
  testRunId: string,
): Required<ContractCaseBoundaryConfig> => ({
  ...config,
  testRunId,
});

export const mapConfigNoId = (
  config: ContractCaseConnectorConfig,
): Required<Omit<ContractCaseBoundaryConfig, 'testRunId'>> => ({
  ...config,
});
