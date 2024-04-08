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
      resultFormatter: resultPrinter,
      makeLogger,
      defaultConfig,
      makeBrokerService,
    }: ReaderDependencies,
    config: CaseConfig,
    parentVersions: string[],
  ) {
    super(
      contractFile.description,
      { throwOnFail: false, testRunId: 'VERIFIER', ...config },
      defaultConfig,
      resultPrinter,
      makeLogger,
      parentVersions,
    );
    this.currentContract = contractFile;
    this.makeBrokerService = makeBrokerService;
    this.links = contractFile;
    this.status = 'UNKNOWN';

    this.mutex = new Mutex();
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    runTestCb: RunTestCallback,
  ): Promise<void> {
    this.initialContext.logger.maintainerDebug(
      `Verifying contract between '${this.currentContract.description.consumerName}' and '${this.currentContract.description.providerName}'. There are '${this.currentContract.examples.length}' examples`,
    );
    const finishedIndicators = [];
    this.currentContract.examples.forEach((example, index) => {
      if (example.result !== 'VERIFIED') {
        throw new CaseCoreError(
          `Attempting to verify an example which was '${example.result}'. This should never happen in normal operation, and might be the result of a corrupted ContractCase file, a file that was not written by ContractCase, or a bug.`,
        );
      }

      const names = exampleToNames(example, `${index}`);
      this.initialContext.logger.maintainerDebug(
        `Preparing test framework's callback for: ${names.mockName} `,
      );
      let exampleFinished: () => void;

      finishedIndicators.push(
        new Promise<void>((resolve) => {
          exampleFinished = resolve;
        }),
      );
      runTestCb(names.mockName, () =>
        this.mutex
          .runExclusive(() => {
            this.initialContext.logger.maintainerDebug(
              `Run test callback for ${names.mockName}`,
            );
            return executeExample(
              { ...example, result: 'PENDING' },
              {
                ...invoker,
                names,
              },
              this,
              applyNodeToContext(example.mock, this.initialContext, {
                '_case:currentRun:context:testName': `${index}`,
                '_case:currentRun:context:contractMode': 'read',
                '_case:currentRun:context:location': [
                  'verification',
                  `mock[${index}]`,
                ],
              }),
            );
          })
          .finally(() => {
            this.initialContext.logger.maintainerDebug(
              `Example[${index}] completed: ${names.mockName}`,
            );
            exampleFinished();
          }),
      );
    });
    let publishFinished: () => void;

    finishedIndicators.push(
      new Promise<void>((resolve) => {
        publishFinished = resolve;
      }),
    );
    runTestCb(
      this.initialContext['_case:currentRun:context:publish']
        ? 'Publishing verification results'
        : 'Finalising contract',
      () => {
        this.initialContext.logger.maintainerDebug(
          'Test callback for ending record',
        );
        return this.endRecord().finally(() => {
          this.initialContext.logger.maintainerDebug(
            `Publishing contract callback completed`,
          );
          publishFinished();
        });
      },
    );

    return Promise.all(finishedIndicators).then(() => {});
  }

  // eslint-disable-next-line class-methods-use-this
  recordExample(
    example: CaseExample,
    currentContext: MatchContext,
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
      this.initialContext,
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
        'Not publishing verification results, as there is no brokerCiAccessToken set',
      );
      return;
    }

    this.initialContext.logger.maintainerDebug(
      'Calling publishVerificationResults',
    );
    await this.makeBrokerService(publishingContext).publishVerificationResults(
      this.links,
      this.status === 'SUCCESS',
      addLocation(
        `PublishingVerification(${this.currentContract.description.consumerName} -> ${this.currentContract.description.providerName})`,
        this.initialContext,
      ),
    );
  }
}
