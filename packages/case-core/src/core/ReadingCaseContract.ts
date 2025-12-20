import { Mutex } from 'async-mutex';

import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  CaseCoreError,
  applyNodeToContext,
  MatchContext,
  addLocation,
  CaseExample,
  CaseConfigurationError,
  ErrorCodes,
} from '@contract-case/case-plugin-base';
import { BaseCaseContract } from './BaseCaseContract';

import type { MultiTestInvoker } from './executeExample/types';
import type { CaseConfig } from './config/types';
import {
  ContractFileFromDisk,
  ContractVerificationResult,
  ContractVerificationTest,
  MakeBrokerService,
  ReaderDependencies,
} from './types';
import { executeExample } from './executeExample';
import { exampleToNames } from '../entities';
import { consumerSlug, providerSlug } from './slugs';

/**
 * ReadingCaseContract deals with a single contract verification (read).
 *
 * It is the entry point for the actual verification process of a contract,
 * but should be called from a connector. At the time of writing, the
 * ContractVerifierConnector is the primary caller.
 *
 * @internal
 */
export class ReadingCaseContract extends BaseCaseContract {
  private mutex: Mutex;

  private readonly makeBrokerService: MakeBrokerService;

  /**
   * The verifier has its own copy of the contract,
   * because some of the BaseCaseContract methods modify
   * the contract.
   */
  private readonly contractFileFromDisk: ContractFileFromDisk;

  /**
   * What the verification status currently is.
   *
   * This is the true verification status; during a run it will be UNKNOWN
   * if no current interactions have failed. It will be set to FAILED if
   * any interaction fails.
   *
   * It can only be success once endRecord has been called.
   */
  private status: 'UNKNOWN' | 'FAILED' | 'SUCCESS';

  /**
   * Indicates that the contract has been closed and verification is complete.
   * Used to prevent attempts to calculate verification status twice.
   */
  private contractClosed: boolean = false;

  /**
   * The tests passed back by a call to {@link ReadingCaseContract#getTests}
   *
   * Will be undefined if getTests has not been called.
   */
  private verificationTests: ContractVerificationTest[] | undefined = undefined;

  /**
   * Constructs a ReadingCaseContract
   *
   * @param contractFile - The DownloadedContract to verify
   * @param readerDependencies - The dependencies for a contract reader (injected)
   * @param config - the CaseConfig for this run
   * @param parentVersions - the array of versions of all the ContractCase packages before this one
   */
  constructor(
    contractFile: ContractFileFromDisk,
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
      contractFile.contents.description,
      { throwOnFail: false, testRunId: 'VERIFIER', ...config },
      defaultConfig,
      resultPrinter,
      makeLogger,
      parentVersions,
    );
    this.currentContract = contractFile.contents;
    this.makeBrokerService = makeBrokerService;
    this.contractFileFromDisk = contractFile;
    this.status = 'UNKNOWN';
    this.mutex = new Mutex();
  }

  /**
   * Calls the executeExample function for a specific interaction.
   *
   * @param index - The index of the interaction to execute
   * @param invoker - The invoker for this test
   * @param completionCallback - A callback to be called before completing the example
   * @returns A promise that resolves when the interaction has been executed completely
   */
  callExecuteExample<T extends AnyMockDescriptorType>(
    index: number,
    invoker: MultiTestInvoker<T>,
    completionCallback: () => void = () => {},
  ): Promise<void> {
    if (this.contractClosed) {
      throw new CaseConfigurationError(
        'Unable to write more interactions to the contract after endRecord() has been called',
        this.initialContext,
        'UNDOCUMENTED',
      );
    }
    return this.mutex.runExclusive(() =>
      Promise.resolve()
        .then(() => {
          const example = this.currentContract.examples[index];
          if (example == null) {
            this.initialContext.logger.error(
              `Somehow the example at index ${index} was undefined. This shouldn't happen, as calls to this function are meant to be based off the indexes. Examples follow:`,
              this.currentContract.examples,
            );
            throw new CaseCoreError(
              `Somehow the example at index ${index} was undefined. This is a bug, please see the log for details.`,
            );
          }
          if (example.result !== 'VERIFIED') {
            throw new CaseCoreError(
              `Attempting to verify an interaction which didn't pass the consumer test ('${example.result}'). This should never happen in normal operation, and might be the result of a corrupted ContractCase file, a file that was not written by ContractCase, or a bug.`,
            );
          }

          const names = exampleToNames(example, `${index}`);
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
          try {
            completionCallback();
          } catch (e) {
            this.runningContext.logger.error(
              `BUG: Error in completion callback: ${(e as Error).message}`,
              e,
            );
          }
        }),
    );
  }

  /**
   * Gets the tests that can be used later to verify the contract
   *
   * @param invoker - The invoker for this test
   * @returns a list of {@link ContractVerificationTest}s that can be run later
   * with the `runTest` callback on the ContractVerificationTest
   */
  getTests<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
  ): ContractVerificationTest[] {
    this.initialContext.logger.maintainerDebug(
      `Generating tests for contract: '${this.currentContract.description.consumerName}' -> '${this.currentContract.description.providerName}'`,
    );
    this.initialContext.logger.maintainerDebug(
      `This contract has ${this.currentContract.examples.length} interactions`,
    );

    this.verificationTests = this.currentContract.examples.map(
      (example, index) => {
        const names = exampleToNames(example, `${index}`);
        this.initialContext.logger.maintainerDebug(
          `Preparing test framework's callback for: ${names.mockName} `,
        );

        let isPending = true;

        return {
          index,
          testName: names.mockName,
          isPending: (): boolean => isPending,
          runTest: (): Promise<void> =>
            this.callExecuteExample(index, invoker, () => {
              isPending = false;
            }),
        };
      },
    );

    return this.verificationTests;
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

  async endRecord(): Promise<ContractVerificationResult> {
    return Promise.resolve(
      addLocation('PublishingResults', this.initialContext),
    )
      .then((publishingContext) => {
        this.contractClosed = true;

        if (this.verificationTests == null) {
          throw new CaseConfigurationError(
            `No verification tests had been prepared; you must call prepareVerification before closing the contract with endRecord()
This may be a bug in the language specifc DSL wrapper.`,
            publishingContext,
            ErrorCodes.configuration.INVALID_LIFECYCLE,
          );
        }

        if (this.status === 'UNKNOWN') {
          // No interactions have failed, let's see if we ran them all
          const isComplete = this.verificationTests.every(
            (test) => !test.isPending(),
          );

          if (isComplete) {
            publishingContext.logger.maintainerDebug(
              `All interactions have passed, marking verification successful`,
            );

            this.status = 'SUCCESS';
          } else {
            publishingContext.logger.error(
              `Some interactions were still pending! This means that some of the test callbacks were not invoked. List follows:`,
            );
            this.verificationTests.forEach((test) => {
              publishingContext.logger.error(
                `Interaction ${test.isPending() ? 'PENDING' : 'COMPLETE'} ${test.testName}`,
              );
            });

            throw new CaseConfigurationError(
              `Some interactions were still pending when verification status was calculated. 
            This means that some of the test callbacks were not invoked.
            See the error logs for details.`,
              publishingContext,
              ErrorCodes.configuration.INVALID_LIFECYCLE,
            );
          }
        }
        if (this.status === 'FAILED') {
          // TODO: Print all failures
          publishingContext.logger.maintainerDebug('Verification failed');
        } else {
          publishingContext.logger.maintainerDebug('Verification successful');
        }

        publishingContext.logger.maintainerDebug(
          'Calling publishVerificationResults',
        );
        return this.makeBrokerService(
          publishingContext,
        ).publishVerificationResults(
          this.contractFileFromDisk.contents,
          this.status === 'SUCCESS',
          addLocation(
            `PublishingVerification(${this.currentContract.description.consumerName} -> ${this.currentContract.description.providerName})`,
            publishingContext,
          ),
        );
      })
      .then(
        (): ContractVerificationResult => ({
          metadata: this.contractFileFromDisk.contents.metadata,
          contractPath: this.contractFileFromDisk.filePath,
          description: this.contractFileFromDisk.contents.description,
          consumerSlug: consumerSlug(this.contractFileFromDisk.contents),
          providerSlug: providerSlug(this.contractFileFromDisk.contents),
          verificationResult:
            this.status === 'SUCCESS' ? 'COMPATIBILE' : 'INCOMPATIBLE',
        }),
      );
  }
}
