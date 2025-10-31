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
} from '../../../core/types';
import type { MultiTestInvoker } from '../../../core/executeExample/types';
import { ReadingCaseContract } from '../../../core/ReadingCaseContract';

import { readerDependencies } from '../../dependencies';
import { configFromEnv, configToRunContext } from '../../../core/config';
import { ContractVerificationTestHandle } from './types';
import { CaseContractDescription } from '../../../entities/types';
import { TestPrinter } from '../types';
import { readContractFromStore } from './readFromStore';

type ContractVerifierHandle = {
  index: number;
  verifier: ReadingCaseContract;
  tests: ContractVerificationTest[];
  filePath: string;
};

type VerifiableContract = {
  contract: ContractFileFromDisk;
  config: CaseConfig;
};

type VerifierConstructorInfo<T extends AnyMockDescriptorType> = {
  config: CaseConfig;
  dependencies: ReaderDependencies;
  parentVersions: string[];
  invoker: MultiTestInvoker<T>;
  invokeableFns: Record<string, (...args: unknown[]) => Promise<unknown>>;
};

const getContractVerifierHandles = <T extends AnyMockDescriptorType>(
  context: DataContext,
  contractsToVerify: VerifiableContract[],
  constructorInfo: VerifierConstructorInfo<T>,
) => {
  if (contractsToVerify.length === 0) {
    throw new CaseConfigurationError(
      "No contracts were matched for verification. Try this run again with logLevel: 'debug' to find out more",
      'DONT_ADD_LOCATION',
    );
  }
  if (constructorInfo.config.internals == null) {
    context.logger.maintainerDebug(
      'config object was missing internals. Object is:',
      constructorInfo.config,
    );
    throw new CaseCoreError(
      'prepareVerification was called with no internals set - this is an error in the caller, probably the language specific wrapper',
    );
  }

  if (contractsToVerify.length > 1) {
    context.logger.debug(
      `*** There are ${contractsToVerify.length} contracts being prepared for verification ***`,
    );
    context.logger.debug(`Take note of the contract number in the log`);
  }
  return contractsToVerify.map((verifiableContract, index) => {
    if (!verifiableContract.contract.contents?.description?.consumerName) {
      context.logger.error(
        `Contract in file '${verifiableContract.contract.filePath}' appears to have no consumer name! It might not be a case contract`,
      );
    }

    if (!verifiableContract.contract.contents?.description?.providerName) {
      context.logger.error(
        `Contract in file '${verifiableContract.contract.filePath}' appears to have no provider name! It might not be a case contract`,
      );
    }

    context.logger.debug(
      `*** Preparing contract: '${verifiableContract.contract.contents.description.consumerName}' -> '${verifiableContract.contract.contents.description.consumerName}'`,
    );
    context.logger.debug(
      `Contract File: ${verifiableContract.contract.filePath}`,
    );
    const contractVerifier = new ReadingCaseContract(
      verifiableContract.contract.contents,
      constructorInfo.dependencies,
      {
        ...verifiableContract.config,
        coreLogContextPrefix:
          contractsToVerify.length > 1 ? `Contract[${index}]` : '',
      },
      constructorInfo.parentVersions,
    );
    Object.entries(constructorInfo.invokeableFns).forEach(([key, value]) => {
      contractVerifier.registerFunction(key, value);
    });

    const tests = contractVerifier.getTests(constructorInfo.invoker);

    return {
      index,
      tests,
      verifier: contractVerifier,
      filePath: verifiableContract.contract.filePath,
    };
  });
};

type VerificationConfig<T extends AnyMockDescriptorType> = {
  invoker: MultiTestInvoker<T>;
  configOverride: CaseConfig;
};

export class ContractVerifierConnector {
  contracts: ContractFileFromDisk[];

  config: CaseConfig;

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

    this.context.logger.deepMaintainerDebug('Constructed VerifierConnector');
  }

  private filterContractsWithConfiguration(
    mergedConfig: CaseConfig,
  ): VerifiableContract[] {
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

    return caseContractsForProvider
      .filter(
        (item) =>
          typeof mergedConfig.consumerName === 'undefined' ||
          item.contents.description?.consumerName === mergedConfig.consumerName,
      )
      .map((contract) => ({ contract, config: mergedConfig }));
  }

  /**
   * Get the contract descriptors that would be targetted by the current configuration.
   *
   * Useful for some filtering use cases, and for confirming that configuration is correct.
   *
   * @returns The available {@link CaseContractDescription}s.
   */
  getAvailableContractDescriptions(): CaseContractDescription[] {
    return this.filterContractsWithConfiguration(this.config).map(
      (verifiableContract) => verifiableContract.contract.contents.description,
    );
  }

  /**
   * This is the main entry point to verifying contract(s). It doesn't run the
   * verification immediately,
   * it returns a list of tests which can be called later with
   * {@link ContractVerifierConnector#runPreparedTest}.
   *
   * It's invalid to call this function multiple times, as once it has been called
   * the tests are prepared. If you do, you'll get a CaseCoreError thrown instead.
   *
   * @param verificationConfigs - One or more (invoker , configOverride) pairs, potentially selecting different subsections of the contract
   * @param configOverride - any overridden config from when this runner was created
   * @param invokeableFns - any invokeable functions that should be registered
   * @returns an array of {@link ContractVerificationTestHandle}s
   */
  prepareMultiVerificationTests<T extends AnyMockDescriptorType>(
    verificationConfigs: VerificationConfig<T>[],
    invokeableFns: Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    > = {},
  ): ContractVerificationTestHandle[] {
    if (this.#contractVerificationHandles) {
      this.context.logger.maintainerDebug(
        'Invalid call to prepareVerification tests. Existing contents of this.#contractVerificationHandles:',
        this.#contractVerificationHandles,
      );
      throw new CaseCoreError(
        "prepareVerificationTests was called, but it looks like a previous run has already been started. It's not valid to call this function multiple times in a run.",
      );
    }

    this.#contractVerificationHandles = verificationConfigs.flatMap(
      (verificationConfig) => {
        const mergedConfig = {
          ...this.config,
          ...verificationConfig.configOverride,
        };
        return getContractVerifierHandles(
          this.context,
          this.filterContractsWithConfiguration(mergedConfig),
          {
            config: mergedConfig,
            dependencies: this.dependencies,
            parentVersions: this.parentVersions,
            invoker: verificationConfig.invoker,
            invokeableFns,
          },
        );
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
   * This is the main entry point to verifying contract(s). It doesn't run the
   * verification immediately,
   * it returns a list of tests which can be called later with
   * {@link ContractVerifierConnector#runPreparedTest}.
   *
   * It's invalid to call this function multiple times, as once it has been called
   * the tests are prepared. If you do, you'll get a CaseCoreError thrown instead.
   *
   * @param invoker - The MultiTestInvoker for this run
   * @param configOverride - any overridden config from when this runner was created
   * @param invokeableFns - any invokeable functions that should be registered
   * @returns an array of {@link ContractVerificationTestHandle}s
   */
  prepareVerificationTests<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    configOverride = {},
    invokeableFns: Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    > = {},
  ): ContractVerificationTestHandle[] {
    return this.prepareMultiVerificationTests(
      [{ invoker, configOverride }],
      invokeableFns,
    );
  }

  /**
   * Runs a prepared test returned by {@link prepareVerificationTests}.
   *
   * @param test - the test to run
   * @returns a successful promise if the test ran. This doesn't necessarily
   * mean that the test passed.
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
