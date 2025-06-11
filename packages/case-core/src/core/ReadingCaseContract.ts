import { Mutex } from 'async-mutex';

import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  CaseCoreError,
  applyNodeToContext,
  MatchContext,
  addLocation,
  CaseExample,
  cantPublish,
} from '@contract-case/case-plugin-base';
import { BaseCaseContract } from './BaseCaseContract';

import type { MultiTestInvoker, RunTestCallback } from './executeExample/types';
import type { CaseConfig } from './config/types';
import {
  DownloadedContract,
  MakeBrokerService,
  ReaderDependencies,
} from './types';
import { executeExample } from './executeExample';
import { exampleToNames } from '../entities';

export class ReadingCaseContract extends BaseCaseContract {
  private mutex: Mutex;

  private makeBrokerService: MakeBrokerService;

  private links: DownloadedContract;

  private status: 'UNKNOWN' | 'FAILED' | 'SUCCESS';

  /**
   * Constructs a ReadingCaseContract
   *
   * @param contractFile - The DownloadedContract to verify
   * @param readerDependencies - The dependencies for a contract reader (injected)
   * @param config - the CaseConfig for this run
   * @param parentVersions - the array of versions of all the ContractCase packages before this one
   * @param mutex - a Mutex to use to ensure that only one test is run at once.
   * this is injected, since the parent class might make more than one
   * ReadingCaseContract objects (if verifying multiple contracts), but only one interaction can be run at once.
   */
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
    mutex: Mutex,
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
    this.mutex = mutex;
  }

  /**
   * Verifies this contract
   *
   * @param invoker - The invoker for this test
   * @param runTestCb - a callback to tell the test framework that we're running a test
   * @returns a Promise if the verification if asyncVerification is set,
   * otherwise undefined. Note that if asyncVerification is false, this method
   * returns before the verification has finished, leaving it up to the test
   * callbacks.
   */
  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    runTestCb: RunTestCallback,
  ): Promise<void> | undefined {
    this.initialContext.logger.maintainerDebug(
      `Verifying contract between '${this.currentContract.description.consumerName}' and '${this.currentContract.description.providerName}'. There are '${this.currentContract.examples.length}' examples`,
    );
    const interactionFinishedIndicators: Promise<unknown>[] = [];
    const interactionFinishers: Array<() => void> = [];

    this.currentContract.examples.forEach((example, index) => {
      if (example.result !== 'VERIFIED') {
        throw new CaseCoreError(
          `Attempting to verify an interaction which was '${example.result}'. This should never happen in normal operation, and might be the result of a corrupted ContractCase file, a file that was not written by ContractCase, or a bug.`,
        );
      }

      const names = exampleToNames(example, `${index}`);
      this.initialContext.logger.maintainerDebug(
        `Preparing test framework's callback for: ${names.mockName} `,
      );

      interactionFinishedIndicators.push(
        new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            this.initialContext.logger.error(
              `Timeout in interaction[${index}]`,
            );
            reject(new Error(names.mockName));
          }, 30000);

          interactionFinishers[index] = () => {
            clearTimeout(timeout);
            resolve();
          };
        }),
      );
      runTestCb(names.mockName, () =>
        this.mutex
          .runExclusive(() => {
            // Set running context instead of inlining this, so that
            // stripMatchers etc have access to the context
            this.runningContext = applyNodeToContext(
              example.mock,
              this.initialContext,
              {
                '_case:currentRun:context:testName': `${index}`,
                '_case:currentRun:context:contractMode': 'read',
                '_case:currentRun:context:location': [
                  'verification',
                  `interaction[${index}]`,
                ],
              },
            );
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
              this.runningContext,
            );
          })
          .finally(() => {
            this.initialContext.logger.deepMaintainerDebug(
              `Interaction[${index}] type of finisher`,
              interactionFinishers[index],
            );
            this.initialContext.logger.maintainerDebug(
              `Interaction[${index}] completed: ${names.mockName}`,
            );
            interactionFinishers[index]?.();
          }),
      );
    });
    let publishFinished: () => void;
    const publishFinishedIndicators = [];
    publishFinishedIndicators.push(
      new Promise<void>((resolve) => {
        publishFinished = resolve;
      }),
    );
    runTestCb(
      cantPublish(this.initialContext)
        ? 'Finalising verification'
        : 'Publishing verification results',
      () => {
        this.initialContext.logger.maintainerDebug(
          'Test callback for ending record',
        );
        return Promise.allSettled(interactionFinishedIndicators)
          .then(() => this.endRecord())
          .finally(() => {
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
      return Promise.all([
        ...interactionFinishedIndicators,
        ...publishFinishedIndicators,
      ]).then(() => {});
    }
    return undefined;
  }

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
        `Interaction was a failure, marking verification failed (was '${this.status}')`,
      );
      this.status = 'FAILED';
    } else {
      currentContext.logger.maintainerDebug(
        `Interaction was a success, no change to current status of '${this.status}'`,
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
