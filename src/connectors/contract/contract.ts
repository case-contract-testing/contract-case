import { CaseConfigurationError } from 'entities';
import { CaseFailedError } from 'entities/CaseFailedError';
import type { ContractFns } from 'entities/context/types';
import type { ContractDescription } from 'entities/contract/types';
import type { Logger } from 'entities/logger/types';
import type { AnyState } from 'entities/nodes/states/types';
import type {
  AnyCaseNodeOrData,
  AnyInteraction,
  LookupableMatcher,
  MatchingError,
} from 'entities/types';
import {
  addFailure,
  addSuccess,
  findMatcher,
  makeContract,
  addLookupableMatcher,
  hasFailure,
} from './structure';
import type { ContractFile } from './structure/types';
import { writeContract } from './writer/fileSystem';

let currentContract: ContractFile;

const saveLookupableMatcher = (
  namedMatcher: LookupableMatcher,
  logger: Logger
): ContractFile => {
  if (!currentContract) {
    logger.error(
      'saveNamedMatcher was called without initialising the contract file. Did you forget to call `startContract`?'
    );
    throw new CaseConfigurationError(
      'You must call `startContract` before running tests (Contract was not initialised at the time that saveNamedMatcher was called)'
    );
  }

  // Have to pull this out, because typescript is dumb and can't see that it's not undefined
  currentContract = addLookupableMatcher(currentContract, namedMatcher, logger);
  return currentContract;
};

const lookupMatcher = (
  uniqueName: string,
  logger: Logger
): AnyCaseNodeOrData => {
  if (!currentContract) {
    logger.error(
      'lookupMatcher was called without initialising the contract file. Did you forget to call `startContract`?'
    );
    throw new CaseConfigurationError(
      'You must call `startContract` before running tests (Contract was not initialised at the time that lookupMatcher was called)'
    );
  }

  // Have to pull this out, because typescript is dumb and can't see that it's not undefined
  const possibleMatch = findMatcher(currentContract, uniqueName);
  if (possibleMatch !== undefined) {
    return possibleMatch;
  }
  throw new CaseConfigurationError(
    `Contract did not contain a matcher with the name '${uniqueName}'. Did you ask for it before it was defined?`
  );
};

export const contractFns: ContractFns = {
  lookupMatcher,
  saveLookupableMatcher,
};

export const beginRecord = (
  description: ContractDescription,
  logger: Logger
): ContractFile => {
  if (currentContract) {
    logger.error(
      'beginRecord was called with a non-empty contract file. Did you call `startContract` more than once?'
    );
    throw new CaseConfigurationError(
      'Contract already had content when beginRecord was called: You must only call `startContract` once per test file'
    );
  }
  currentContract = makeContract(description);
  return currentContract;
};

export const recordSuccess = (
  interaction: AnyInteraction,
  states: Array<AnyState>,
  logger: Logger
): ContractFile => {
  if (!currentContract) {
    logger.error(
      'recordSuccess was called without initialising the contract file. Did you forget to call `startContract`?'
    );
    throw new CaseConfigurationError(
      'You must call `startContract` before running tests (Contract was not initialised at the time that recordSuccess was called)'
    );
  }

  currentContract = addSuccess(currentContract, interaction, states, logger);
  return currentContract;
};

export const recordFailure = (
  interaction: AnyInteraction,
  states: Array<AnyState>,
  logger: Logger,
  errors: Array<MatchingError>
): ContractFile => {
  if (!currentContract) {
    logger.error(
      'recordFailure was called without initialising the contract file. Did you forget to call `startContract`?'
    );
    throw new CaseConfigurationError(
      'You must call `startContract` before running tests (Contract was not initialised at the time that recordFailure was called)'
    );
  }
  currentContract = addFailure(
    currentContract,
    interaction,
    states,
    errors,
    logger
  );
  return currentContract;
};

export const endRecord = (logger: Logger): void => {
  if (hasFailure(currentContract)) {
    // TODO: Print all failures
    throw new CaseFailedError();
  }

  //  - if success, write contract
  const fileName = writeContract(currentContract, logger);
  logger.debug(`Wrote contract file: ${fileName}`);
};
