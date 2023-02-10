import { Mutex } from 'async-mutex';

import { DEFAULT_CONFIG, executeExample } from 'connectors/contract/core';
import type { CaseConfig } from 'connectors/contract/core/types';
import { makeLogger as defaultMakeLogger } from 'connectors/logger';
import { CaseCoreError } from 'entities';

import { applyNodeToContext } from 'entities/context';
import {
  makeFailedExample,
  makeSuccessExample,
  nameExample,
} from 'entities/contract/interactions';
import type { Logger } from 'entities/logger/types';
import type {
  CaseError,
  CaseExample,
  LogLevelContext,
  MatchContext,
} from 'entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import type { ContractFile } from './structure/types';
import type { MultiTestInvoker, RunTestCallback } from './types';

export class CaseVerifier extends BaseCaseContract {
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

  verifyContract(
    { stateHandlers = {} }: MultiTestInvoker,
    runTestCb: RunTestCallback
  ): void {
    this.currentContract.examples.forEach((example, index) => {
      if (example.result !== 'VERIFIED') {
        throw new CaseCoreError(
          `Attempting to verify an example which was '${example.result}'. This should never happen in normal operation, and might be the result of a corrupted Case file, a file that was not written by Case, or a bug.`
        );
      }
      runTestCb(nameExample(example, `${index}`), () =>
        this.mutex.runExclusive(() =>
          executeExample(
            { ...example, result: 'PENDING' },
            stateHandlers,
            this,
            async () => {},
            applyNodeToContext(example.interaction, this.initialContext, {
              'case:currentRun:context:testName': `${index}`,
              'case:currentRun:context:expectation': 'produce',
              'case:currentRun:context:contractMode': 'read',
              'case:currentRun:context:location': [
                'verification',
                `interaction[${index}]`,
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
