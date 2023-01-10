import {
  configToRunContext,
  DEFAULT_CONFIG,
  setupHandledAssert,
} from 'connectors/contract/core';
import type { CaseConfig } from 'connectors/contract/core/types';
import { makeLogger as defaultMakeLogger } from 'connectors/logger';
import {
  CaseCoreError,
  CaseConfigurationError,
  coreNullMatcher,
} from 'entities';
import { CaseFailedError } from 'entities/CaseFailedError';
import { addLocation, applyNodeToContext } from 'entities/context';
import type { CaseExample, ContractDescription } from 'entities/contract/types';
import type { Logger } from 'entities/logger/types';
import { makeResults } from 'entities/results';
import type { AnyState } from 'entities/states/types';
import type {
  LogLevelContext,
  AnyInteractionType,
  CaseInteractionFor,
  Assertable,
  AnyInteraction,
  MatchingError,
  MatchContext,
} from 'entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import { addExample, hasFailure } from './structure';
import { writeContract } from './writer/fileSystem';

export class CaseContract extends BaseCaseContract {
  testIndex = 0;

  constructor(
    description: ContractDescription,
    config: CaseConfig = DEFAULT_CONFIG,
    makeLogger: (context: LogLevelContext) => Logger = defaultMakeLogger
  ) {
    super(description, config, makeLogger);
  }

  setup<T extends AnyInteractionType>(
    states: Array<AnyState>,
    interaction: CaseInteractionFor<T>,
    runConfig?: CaseConfig
  ): Promise<Assertable<T>> {
    const thisIndex = this.testIndex;
    this.testIndex += 1;

    return setupHandledAssert(
      states,
      interaction,
      applyNodeToContext(interaction, this.initialContext, {
        ...(runConfig ? configToRunContext(runConfig) : {}),
        'case:currentRun:context:testName': `${thisIndex}`,
      }),
      this
    );
  }

  recordSuccess(
    interaction: AnyInteraction,
    states: Array<AnyState>,
    currentContext: MatchContext
  ): CaseExample {
    if (!this.currentContract) {
      currentContext.logger.error(
        'recordSuccess was called without initialising the contract file. This should not be possible.'
      );
      throw new CaseCoreError(
        'Contract was not initialised at the time that recordSuccess was called)'
      );
    }
    const example: CaseExample = {
      result: 'VERIFIED',
      states,
      interaction,
    };
    this.currentContract = addExample(
      this.currentContract,
      example,
      currentContext.logger
    );
    return example;
  }

  recordFailure(
    interaction: AnyInteraction,
    states: Array<AnyState>,
    currentContext: MatchContext,
    errors: Array<MatchingError>
  ): CaseExample {
    if (!this.currentContract) {
      currentContext.logger.error(
        'recordFailure was called without initialising the contract file. Did you forget to call `startContract`?'
      );
      throw new CaseConfigurationError(
        'You must call `startContract` before running tests (Contract was not initialised at the time that recordFailure was called)'
      );
    }
    const example: CaseExample = {
      result: 'FAILED',
      states,
      interaction,
      errors,
    };
    this.currentContract = addExample(
      this.currentContract,
      example,
      currentContext.logger
    );
    return example;
  }

  endRecord(): void {
    const writingContext = addLocation('WritingContract', this.initialContext);
    if (hasFailure(this.currentContract)) {
      // TODO: Print all failures
      throw new CaseFailedError(
        makeResults({
          message: 'There were contract failures',
          expected: 'No failures',
          matcher: coreNullMatcher(),
          actual: 'Some failures',
          location: ['Writing Contract'],
          toString: () => 'There were contract failures',
        })
      );
    }
    //  - if success, write contract
    const fileName = writeContract(this.currentContract, writingContext);

    writingContext.logger.debug(`Wrote contract file: ${fileName}`);
  }
}
