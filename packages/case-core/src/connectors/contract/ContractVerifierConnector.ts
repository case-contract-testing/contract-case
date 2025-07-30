import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  CaseConfigurationError,
  DataContext,
  constructDataContext,
  CaseCoreError,
} from '@contract-case/case-plugin-base';

import type {
  CaseConfig,
  ContractFileFromDisk,
  ContractVerificationTest,
  ReaderDependencies,
} from '../../core/types';
import type {
  MultiTestInvoker,
  RunTestCallback,
} from '../../core/executeExample/types';
import { ReadingCaseContract } from '../../core/ReadingCaseContract';

import { readerDependencies } from '../dependencies';
import { configFromEnv, configToRunContext } from '../../core/config';
import { ContractStore } from '../../core/types.ContractReader';
import { ContractVerificationTestHandle, TestPrinter } from './types';
import { CaseContractDescription } from '../../entities/types';

type ContractVerifierHandle = {
  index: number;
  verifier: ReadingCaseContract;
  tests: ContractVerificationTest[];
  filePath: string;
};

const readContractFromStore = (
  config: CaseConfig,
  reader: ContractStore,
): ContractFileFromDisk[] => {
  if (
    config.contractFilename !== undefined &&
    typeof config.contractFilename === 'string'
  ) {
    return [reader.readContract(config.contractFilename)];
  }
  if (
    config.contractDir !== undefined &&
    typeof config.contractDir === 'string'
  ) {
    return reader.readContractsFromDir(config.contractDir);
  }
  throw new CaseConfigurationError(
    'No contractFilename or contractDir specified. Must provide one of these so that Case can find the contract(s) to verify',
    'DONT_ADD_LOCATION',
    'INVALID_CONFIG',
  );
};

export class ContractVerifierConnector {
  contracts: ContractFileFromDisk[];

  config: CaseConfig;

  callback: RunTestCallback;

  dependencies: ReaderDependencies;

  context: DataContext;

  parentVersions: string[];

  /**
   * Internal links for the prepare / verify mode
   *
   * @internal
   */
  #contractVerificationHandles: ContractVerifierHandle[] | undefined;

  constructor(
    userConfig: CaseConfig,
    callback: RunTestCallback,
    printer: TestPrinter,
    parentVersions: string[],
    dependencies = readerDependencies(printer),
  ) {
    this.dependencies = dependencies;
    this.parentVersions = parentVersions;
    this.config = {
      ...dependencies.defaultConfig,
      ...configFromEnv(),
      ...userConfig,
    };

    this.context = // TODO: Extract constructDataContext to somewhere more DRY
      constructDataContext(
        this.dependencies.makeLogger,
        this.dependencies.resultFormatter,
        {
          ...configToRunContext(this.config),
        },
        dependencies.defaultConfig,
        parentVersions,
      );

    const store = this.dependencies.makeContractStore(this.context);

    this.contracts = readContractFromStore(this.config, store);

    this.callback = callback;

    this.context.logger.deepMaintainerDebug('Constructed VerifierConnector');
  }

  private filterContractsWithConfiguration(
    mergedConfig: CaseConfig,
  ): ContractFileFromDisk[] {
    if (typeof mergedConfig.providerName !== 'string') {
      throw new CaseConfigurationError(
        `Must provide a providerName to verify (received '${mergedConfig.providerName}').`,
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
      );
    }
    this.context.logger.debug(
      `There are ${this.contracts.length} contracts loaded (this may include contracts that don't belong to this run)`,
    );
    this.contracts
      .filter(
        (item) =>
          item.contents.description?.providerName !== mergedConfig.providerName,
      )
      .forEach((item) => {
        this.context.logger.debug(
          `Skipping ${item.filePath} because it is not for the provider '${mergedConfig.providerName}' (It was for '${item.contents.description?.providerName}' instead)`,
        );
      });

    const caseContractsForProvider = this.contracts.filter(
      (item) =>
        item.contents.description?.providerName === mergedConfig.providerName,
    );

    caseContractsForProvider
      .filter(
        (item) =>
          typeof mergedConfig.consumerName !== 'undefined' &&
          item.contents.description?.consumerName !== mergedConfig.consumerName,
      )
      .forEach((item) => {
        this.context.logger.debug(
          `Skipping ${item.filePath} because it is not for the consumer '${mergedConfig.consumerName}' (It was for '${item.contents.description?.consumerName}' instead)`,
        );
      });

    return caseContractsForProvider.filter(
      (item) =>
        typeof mergedConfig.consumerName === 'undefined' ||
        item.contents.description?.consumerName === mergedConfig.consumerName,
    );
  }

  getAvailableContractDescriptions(): CaseContractDescription[] {
    return this.filterContractsWithConfiguration(this.config).map(
      (link) => link.contents.description,
    );
  }

  /**
   * This is an alternative to verifyContract. Instead of running the verification immediately,
   * it returns a list of tests which can be called later with
   * {@link ContractVerifierConnector#runPreparedTest}.
   *
   * @param invoker - The MultiTestInvoker for this run
   * @param configOverride - any overridden config from when this runner was created
   * @param invokeableFns - any invokeable functions that should be registered
   * @returns
   */
  prepareVerificationTests<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    configOverride = {},
    invokeableFns: Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    > = {},
  ): ContractVerificationTestHandle[] {
    const mergedConfig = { ...this.config, ...configOverride };

    const contractsToVerify =
      this.filterContractsWithConfiguration(mergedConfig);

    if (contractsToVerify.length === 0) {
      throw new CaseConfigurationError(
        "No contracts were matched for verification. Try this run again with logLevel: 'debug' to find out more",
        'DONT_ADD_LOCATION',
      );
    }
    if (mergedConfig.internals == null) {
      throw new CaseCoreError(
        'prepareVerification was called with no internals set - this is an error in the caller, probably the language specific wrapper',
      );
    }

    if (contractsToVerify.length > 1) {
      this.context.logger.debug(
        `*** There are ${contractsToVerify.length} contracts being prepared for verification ***`,
      );
      this.context.logger.debug(`Take note of the contract number in the log`);
    }
    this.#contractVerificationHandles = contractsToVerify.map(
      (contractLink, index) => {
        if (!contractLink?.contents?.description?.consumerName) {
          this.context.logger.error(
            `Contract in file '${contractLink.filePath}' appears to have no consumer name! It might not be a case contract`,
          );
        }

        if (!contractLink?.contents?.description?.providerName) {
          this.context.logger.error(
            `Contract in file '${contractLink.filePath}' appears to have no provider name! It might not be a case contract`,
          );
        }

        this.context.logger.debug(
          `*** Preparing contract: '${contractLink.contents.description.consumerName}' -> '${contractLink.contents.description.consumerName}'`,
        );
        this.context.logger.debug(`Contract File: ${contractLink.filePath}`);
        const contractVerifier = new ReadingCaseContract(
          contractLink.contents,
          this.dependencies,
          {
            ...mergedConfig,
            coreLogContextPrefix:
              contractsToVerify.length > 1 ? `Contract[${index}]` : '',
          },
          this.parentVersions,
        );
        Object.entries(invokeableFns).forEach(([key, value]) => {
          contractVerifier.registerFunction(key, value);
        });

        const tests = contractVerifier.getTests(invoker);

        return {
          index,
          tests,
          verifier: contractVerifier,
          filePath: contractLink.filePath,
        };
      },
    );

    this.context.logger.deepMaintainerDebug(
      'prepared verification handles set to:',
      this.#contractVerificationHandles,
    );
    return this.#contractVerificationHandles.flatMap((contractHandle) =>
      contractHandle.tests.map((testHandle) => ({
        testName: testHandle.testName,
        testIndex: testHandle.index,
        contractIndex: contractHandle.index,
        filePath: contractHandle.filePath,
      })),
    );
  }

  /**
   * Runs a prepared test returned by {@link prepareVerificationTests}.
   * Promises returned by this have the same semantics as verifyContract.
   *
   * @param test - the test to run
   * @returns a successful promise if the test ran (like verifyContract, by
   * default the test may have failedi f, but the promise can be successful).
   */
  async runPreparedTest(test: ContractVerificationTestHandle): Promise<void> {
    const handles = this.#contractVerificationHandles;
    return Promise.resolve().then(() => {
      if (handles == null) {
        this.context.logger.deepMaintainerDebug(
          'ERROR no contractVerificationHandles. Class was:',
          this,
        );
        throw new CaseCoreError(
          'runPreparedTest was called before prepareVerificationTests. This is probably a bug in the language DSL wrapper',
        );
      }
      const contractHandle = handles[test.contractIndex];
      this.context.logger.deepMaintainerDebug(
        'Run prepared test had contract handle',
        contractHandle,
      );
      if (contractHandle == null) {
        this.context.logger.error(
          'BUG: Run prepared test invoked incorrectly. See exception for details. The contractVerificationHandles object is:',
          handles,
        );
        throw new CaseCoreError(
          `The contract handle ${test.contractIndex} was undefined. This is probably a bug in the language DSL wrapper`,
        );
      }
      const testHandle = contractHandle.tests[test.testIndex];
      this.context.logger.deepMaintainerDebug(
        'Run prepared test had testHandle',
        testHandle,
      );
      if (testHandle == null) {
        this.context.logger.error(
          'BUG: Run prepared test invoked incorrectly. See exception for details. The contractVerificationHandles object is:',
          handles,
        );
        throw new CaseCoreError(
          `The testHandle ${test.testIndex} was undefined. This is probably a bug in the language DSL wrapper`,
        );
      }
      return testHandle.runTest();
    });
  }

  /**
   * Closes a verification
   *
   * @returns a successful promise if the verification closed successfully
   */
  async closePreparedVerification(): Promise<void> {
    return Promise.resolve().then(() => {
      if (this.#contractVerificationHandles == null) {
        this.context.logger.maintainerDebug(
          "Closing contract verifications, but they weren't prepared - assuming closed.",
        );
        // We don't need to close tests run with runVerification
        return Promise.resolve();
      }
      const contractVerifiers = this.#contractVerificationHandles.reduce<
        ReadingCaseContract[]
      >((acc, curr) => {
        acc[curr.index] = curr.verifier;
        return acc;
      }, []);

      this.context.logger.maintainerDebug(
        'Closing contract verifications',
        contractVerifiers,
      );

      return Promise.allSettled(
        contractVerifiers.map((v) =>
          Promise.resolve().then(() => v.endRecord()),
        ),
      ).then((results) => {
        const failures = results
          .filter((result) => result.status === 'rejected')
          .map(({ reason }) => reason);
        if (failures.length > 0) {
          this.context.logger.error(
            `There were failures verifying ${failures.length} contracts`,
          );
          failures.forEach((failure) => {
            this.context.logger.error(
              `${
                (failure as Error).name ? `${(failure as Error).name}: ` : ''
              } ${(failure as Error).message}`,
            );
          });
          this.context.logger.error(`Throwing only the first error`);
          throw failures[0];
        }
      });
    });
  }
}
