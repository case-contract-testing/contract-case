import { Mutex } from 'async-mutex';

import { CaseCoreError } from '../entities';
import { addLocation, applyNodeToContext } from '../entities/context';
import { exampleToNames } from '../entities/contract';
import type {
  CaseExample,
  MatchContext,
  AnyMockDescriptorType,
} from '../entities/types';

import { BaseCaseContract } from './BaseCaseContract';
import { executeExample } from './executeExample';

import type { MultiTestInvoker, RunTestCallback } from './executeExample/types';
import type { CaseConfig } from './config/types';
import {
  DownloadedContract,
  MakeBrokerService,
  ReaderDependencies,
} from './types';

export class ReadingCaseContract extends BaseCaseContract {
  private mutex: Mutex;

  private makeBrokerService: MakeBrokerService;

  private links: DownloadedContract;

  private status: 'UNKNOWN' | 'FAILED' | 'SUCCESS';

  constructor(
    contractFile: DownloadedContract,
    {
      resultPrinter,
      makeLogger,
      defaultConfig,
      makeBrokerService,
    }: ReaderDependencies,
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
    this.makeBrokerService = makeBrokerService;
    this.links = contractFile;
    this.status = 'UNKNOWN';

    this.mutex = new Mutex();
  }

  verifyContract<T extends AnyMockDescriptorType>(
    { stateHandlers = {}, triggers }: MultiTestInvoker<T>,
    runTestCb: RunTestCallback
  ): void {
    this.currentContract.examples.forEach((example, index) => {
      if (example.result !== 'VERIFIED') {
        throw new CaseCoreError(
          `Attempting to verify an example which was '${example.result}'. This should never happen in normal operation, and might be the result of a corrupted ContractCase file, a file that was not written by ContractCase, or a bug.`
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
              '_case:currentRun:context:testName': `${index}`,
              '_case:currentRun:context:contractMode': 'read',
              '_case:currentRun:context:location': [
                'verification',
                `mock[${index}]`,
              ],
            })
          )
        )
      );
    });
    runTestCb('Publishing verification results', () => {
      this.initialContext.logger.maintainerDebug('In test callback');
      return this.endRecord();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  recordExample(
    example: CaseExample,
    currentContext: MatchContext
  ): CaseExample {
    if (example.result === 'FAILED') {
      this.status = 'FAILED';
    }
    currentContext.logger.maintainerDebug(`recordExample called with`, example);
    return example;
  }

  async endRecord(): Promise<void> {
    const publishingContext = addLocation(
      'PublishingResults',
      this.initialContext
    );
    if (this.status === 'UNKNOWN') {
      this.status = 'SUCCESS';
    }
    if (this.status === 'FAILED') {
      // TODO: Print all failures
      this.initialContext.logger.maintainerDebug('Verification failed');
    } else {
      this.initialContext.logger.maintainerDebug('Verification successful');
    }

    if (!this.initialContext['_case:currentRun:context:brokerCiAccessToken']) {
      this.initialContext.logger.warn(
        'Not publishing verification results, as there is no brokerCiAccessToken set'
      );
      return;
    }

    this.initialContext.logger.maintainerDebug(
      'Calling publishVerificationResults'
    );
    await this.makeBrokerService(publishingContext).publishVerificationResults(
      this.links,
      this.status === 'SUCCESS',
      addLocation(
        `PublishingVerification(${this.currentContract.description.consumerName} -> ${this.currentContract.description.providerName})`,
        this.initialContext
      )
    );
  }
}
