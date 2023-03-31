import { Mutex } from 'async-mutex';

import { CaseCoreError } from '../entities';
import { applyNodeToContext } from '../entities/context';
import { exampleToNames } from '../entities/contract';
import type {
  ContractData,
  CaseExample,
  MatchContext,
  AnyMockDescriptorType,
} from '../entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import { executeExample } from './executeExample';

import type { MultiTestInvoker, RunTestCallback } from './executeExample/types';
import type { CaseConfig } from './config/types';
import { ReaderDependencies } from './types';

export class ReadingCaseContract extends BaseCaseContract {
  mutex: Mutex;

  constructor(
    contractFile: ContractData,
    { resultPrinter, makeLogger, defaultConfig }: ReaderDependencies,
    config: CaseConfig
  ) {
    super(
      contractFile.description,
      { throwOnFail: false, testRunId: 'VERIFIER', ...config },
      defaultConfig,
      resultPrinter,
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
    currentContext.logger.maintainerDebug(`recordExample called with`, example);
    return example;
  }
}
