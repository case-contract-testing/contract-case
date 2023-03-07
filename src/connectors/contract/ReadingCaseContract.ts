import { Mutex } from 'async-mutex';

import { makeLogger as defaultMakeLogger } from '../logger';

import { CaseCoreError } from '../../entities';
import { applyNodeToContext } from '../../entities/context';
import {
  exampleToNames,
  makeSuccessExample,
  makeFailedExample,
} from '../../entities/contract';
import type {
  ContractFile,
  LogLevelContext,
  Logger,
  CaseExample,
  MatchContext,
  CaseError,
  AnyMockDescriptorType,
} from '../../entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import { DEFAULT_CONFIG, executeExample } from './core';
import type { CaseConfig } from './core/types';

import type { MultiTestInvoker, RunTestCallback } from './types';

export class ReadingCaseContract extends BaseCaseContract {
  mutex: Mutex;

  constructor(
    contractFile: ContractFile,
    config: CaseConfig = DEFAULT_CONFIG,
    makeLogger: (context: LogLevelContext) => Logger = defaultMakeLogger
  ) {
    super(
      contractFile.description,
      { testRunId: 'VERIFIER', ...config },
      makeLogger
    );
    this.currentContract = contractFile;

    this.mutex = new Mutex();
  }

  verifyContract<T extends AnyMockDescriptorType>(
    { stateHandlers = {}, triggers }: MultiTestInvoker<T>,
    runTestCb: RunTestCallback
  ): void {
    this.currentContract.examples.forEach((example, index) => {
      if (example.result !== 'VERIFIED') {
        throw new CaseCoreError(
          `Attempting to verify an example which was '${example.result}'. This should never happen in normal operation, and might be the result of a corrupted Case file, a file that was not written by Case, or a bug.`
        );
      }

      const names = exampleToNames(example, `${index}`);

      runTestCb(names.mockName, () =>
        this.mutex.runExclusive(() =>
          executeExample(
            { ...example, result: 'PENDING' },
            { stateHandlers, names, triggers },
            this,
            applyNodeToContext(example.mock, this.initialContext, {
              'case:currentRun:context:testName': `${index}`,
              'case:currentRun:context:contractMode': 'read',
              'case:currentRun:context:location': [
                'verification',
                `mock[${index}]`,
              ],
            })
          )
        )
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  recordExample(
    example: CaseExample,
    currentContext: MatchContext
  ): CaseExample {
    currentContext.logger.debug(`${example}`);
    return example;
  }

  // eslint-disable-next-line class-methods-use-this
  recordSuccess(
    example: CaseExample,
    currentContext: MatchContext
  ): CaseExample {
    currentContext.logger.debug(`${example}`);
    return makeSuccessExample(example);
  }

  // eslint-disable-next-line class-methods-use-this
  recordFailure(
    example: CaseExample,
    currentContext: MatchContext,
    errors: Array<CaseError>
  ): CaseExample {
    currentContext.logger.debug(`${example}`);
    return makeFailedExample(example, errors);
  }
}
