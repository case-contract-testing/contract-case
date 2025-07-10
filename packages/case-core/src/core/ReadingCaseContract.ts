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
      `Verifying contract: '${this.currentContract.description.consumerName}' -> '${this.currentContract.description.providerName}'`,
    );
    this.initialContext.logger.maintainerDebug(
      `This contract has ${this.currentContract.examples.length} interactions`,
    );
    const interactionPromises: Array<{ r: () => void; p: Promise<void> }> = [];

    this.currentContract.examples.forEach((example, index) => {
      if (example.result !== 'VERIFIED') {
        throw new CaseCoreError(
          `Attempting to verify an interaction which didn't pass the consumer test ('${example.result}'). This should never happen in normal operation, and might be the result of a corrupted ContractCase file, a file that was not written by ContractCase, or a bug.`,
        );
      }

      const names = exampleToNames(example, `${index}`);
      this.initialContext.logger.maintainerDebug(
        `Preparing test framework's callback for: ${names.mockName} `,
      );

      let r: () => void = () => {
        // This promise should be immediately overwritten by
        // the resolution function in `immediatePromise` directly below
        throw new CaseCoreError(
          "An uninitialised promise resolver was called. This isn't supposed to be possible, as promises that don't do any read/write execute immediately",
          this.initialContext,
        );
      };
      const immediatePromise = new Promise<void>((resolve) => {
        r = () => {
          this.initialContext.logger.deepMaintainerDebug(
            `Completion called for [${index}]`,
          );
          resolve();
        };
      });

      interactionPromises[index] = {
        r,
        p: immediatePromise,
      };

      // interactionFinishedIndicators.push();
      this.initialContext.logger.deepMaintainerDebug(
        `Calling test callback for ${names.mockName}`,
      );
      runTestCb(names.mockName, () =>
        this.mutex.runExclusive(() =>
          Promise.resolve()
            .then(() => {
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
                interactionPromises[index],
              );
              this.initialContext.logger.maintainerDebug(
                `Interaction[${index}] completed: ${names.mockName}`,
              );
              if (!interactionPromises[index]) {
                this.initialContext.logger.error(
                  `CoreError: Interaction[${index}] had no finisher. Please report this as a bug.`,
                );
              }
              interactionPromises[index]?.r();
            }),
        ),
      );
    });
    let publishFinished: () => void;
    const publishFinishedIndicators = [];
    publishFinishedIndicators.push(
      new Promise<void>((resolve) => {
        publishFinished = resolve;
      }),
    );
    this.initialContext.logger.deepMaintainerDebug(
      `Calling test callback for publish / finalise`,
    );
    runTestCb(
      cantPublish(this.initialContext)
        ? 'Finalising verification'
        : 'Publishing verification results',
      () =>
        this.mutex.runExclusive(() => {
          this.initialContext.logger.maintainerDebug(
            'Test callback for ending record',
          );
          this.initialContext.logger.deepMaintainerDebug(
            'Test callback for ending record',
          );
          return Promise.allSettled(interactionPromises.map(({ p }) => p))
            .then(() => this.endRecord())
            .finally(() => {
              this.initialContext.logger.maintainerDebug(
                `Publishing contract callback completed`,
              );
              publishFinished();
            });
        }),
    );
    if (
      this.initialContext['_case:currentRun:context:internals'] &&
      this.initialContext['_case:currentRun:context:internals']
        .asyncVerification
    ) {
      this.initialContext.logger.deepMaintainerDebug(
        `Async verification is on, waiting for`,
        interactionPromises.map(({ p }) => p),
        publishFinishedIndicators,
      );
      return Promise.all([
        ...interactionPromises.map(({ p }) => p),
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
