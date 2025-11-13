import {
  CaseConfigurationError,
  DataContext,
} from '@contract-case/case-plugin-base';
import { CaseConfig, ContractFileFromDisk } from '../../../core/types';
import { VerifiableContract } from './types';

export const filterContractsWithConfiguration = (
  context: DataContext,
  contracts: ContractFileFromDisk[],
  mergedConfig: CaseConfig,
): VerifiableContract[] => {
  if (typeof mergedConfig.providerName !== 'string') {
    throw new CaseConfigurationError(
      `Must provide a providerName to verify (received '${mergedConfig.providerName}').`,
      'DONT_ADD_LOCATION',
      'INVALID_CONFIG',
    );
  }
  context.logger.debug(
    `There are ${contracts.length} contracts loaded (this may include contracts that don't belong to this run)`,
  );
  contracts
    .filter(
      (item) =>
        item.contents.description?.providerName !== mergedConfig.providerName,
    )
    .forEach((item) => {
      context.logger.debug(
        `Skipping ${item.filePath} because it is not for the provider '${mergedConfig.providerName}' (It was for '${item.contents.description?.providerName}' instead)`,
      );
    });

  const caseContractsForProvider = contracts.filter(
    (item) =>
      item.contents.description?.providerName === mergedConfig.providerName,
  );

  caseContractsForProvider
    .filter(
      (item) =>
        typeof mergedConfig.consumerName !== 'undefined' &&
        item.contents.description?.consumerName !== mergedConfig.consumerName,
    )
    .forEach((item) => {
      context.logger.debug(
        `Skipping ${item.filePath} because it is not for the consumer '${mergedConfig.consumerName}' (It was for '${item.contents.description?.consumerName}' instead)`,
      );
    });

  return caseContractsForProvider
    .filter(
      (item) =>
        typeof mergedConfig.consumerName === 'undefined' ||
        item.contents.description?.consumerName === mergedConfig.consumerName,
    )
    .map((contract) => ({ contract, config: mergedConfig }));
};
