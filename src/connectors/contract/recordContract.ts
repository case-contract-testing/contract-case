import { CaseConfigurationError } from 'entities';
import type { ContractDescription } from 'entities/contract/types';
import type { Logger } from 'entities/logger/types';
import type { AnyInteraction, MatchingError } from 'entities/types';
import { addFailure, addSuccess, makeContract } from './structure/structure';
import type { CaseState, ContractFile } from './structure/types';

let currentContract: ContractFile;

export const beginRecord = (
  description: ContractDescription,
  logger: Logger
): ContractFile => {
  if (currentContract) {
    logger.error('beginRecord was called with a non-empty contract file');
    throw new CaseConfigurationError(
      'Contract already had content when beginRecord was called'
    );
  }
  currentContract = makeContract(description);
  return currentContract;
};

export const recordSuccess = (
  interaction: AnyInteraction,
  states: Array<CaseState>,
  logger: Logger
): ContractFile => {
  if (!currentContract) {
    logger.error(
      'recordSuccess was called without initialising the contract file'
    );
    throw new CaseConfigurationError(
      'Contract was not initialised at the time that recordSuccess was called'
    );
  }

  currentContract = addSuccess(currentContract, interaction, states);
  return currentContract;
};

export const recordFailure = (
  interaction: AnyInteraction,
  states: Array<CaseState>,
  logger: Logger,
  errors: Array<MatchingError>
): ContractFile => {
  if (!currentContract) {
    logger.error(
      'recordFailure was called without initialising the contract file'
    );
    throw new CaseConfigurationError(
      'Contract was not initialised at the time that recordFailure was called'
    );
  }
  currentContract = addFailure(currentContract, interaction, states, errors);
  return currentContract;
};

export const endRecord = (): void => {
  // Check for success
  //  - if success, write contract
  //  - if fail, print all failures and throw
};
