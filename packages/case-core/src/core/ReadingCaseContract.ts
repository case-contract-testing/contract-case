import { Mutex } from 'async-mutex';

import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  CaseCoreError,
  applyNodeToContext,
  MatchContext,
  addLocation,
} from '@contract-case/case-plugin-base';
import { exampleToNames } from '@contract-case/case-plugin-base/dist/src/core/contract';
import { CaseExample } from '@contract-case/case-plugin-base/dist/src/core/contract/types';
import { BaseCaseContract } from './BaseCaseContract';

import type { MultiTestInvoker, RunTestCallback } from './executeExample/types';
import type { CaseConfig } from './config/types';
import {
  DownloadedContract,
  MakeBrokerService,
  ReaderDependencies,
} from './types';
import { executeExample } from './executeExample';

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
  ): Promise<void> | undefined {
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
    if (
      this.initialContext['_case:currentRun:context:internals'] &&
      this.initialContext['_case:currentRun:context:internals']
        .asyncVerification
    ) {
      return Promise.all(finishedIndicators).then(() => {});
    }
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  recordExample(
    example: CaseExample,
    currentContext: MatchContext,
  ): CaseExample {
    currentContext.logger.deepMaintainerDebug(
      `recordExample called with`,
      example,
    );
    if (example.result === 'FAILED') {
      currentContext.logger.maintainerDebug(
        `Example was a failure, marking verification failed (was '${this.status}')`,
      );
      this.status = 'FAILED';
    } else {
      currentContext.logger.maintainerDebug(
        `Example was a success, no change to current status of '${this.status}'`,
      );
    }
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
