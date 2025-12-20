import {
  CaseConfigurationError,
  CaseCoreError,
  ContractVerifierConnector,
} from '@contract-case/case-core';

import {
  convertConfig,
  jsErrorToFailure,
  mapInvokableFunctions,
  wrapLogPrinter,
} from './mappers/index.js';
import {
  ILogPrinter,
  IResultPrinter,
  ContractCaseBoundaryConfig,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithAny,
} from './boundary/index.js';
import { versionString } from '../../../entities/versionString.js';
import {
  BoundaryContractVerificationTestHandle,
  BoundaryInvokableFunction,
} from './types.js';
import { mergeConfig, mergeInvokers } from './mergers.js';

/**
 * A BoundaryContractVerifier allows verifying contracts that have been written
 * by a BoundaryContractDefiner.
 *
 * This is part of the public interface of ContractCase, although most
 * implementations will call it through the grpc wrapper defined elsewhere in this package.
 *
 * @public
 */
export class BoundaryContractVerifier {
  /**
   * The internal verifier. This is exposed by the core package, and is the main entry
   * point within the core package.
   * However, it's not part of the public interface
   * of ContractCase.
   *
   * @internal
   */
  private verifier: ContractVerifierConnector | undefined;

  /**
   * The config passed during the constructor. This is considered
   * the "base" config for this verifier, and can be overridden by
   * method calls.
   *
   * @internal
   */
  private readonly constructorConfig: ContractCaseBoundaryConfig;

  /**
   * User provided log printer
   *
   * @internal
   */
  private readonly logPrinter: ILogPrinter;

  /**
   * User provided result printer
   *
   * @internal
   */
  private readonly resultPrinter: IResultPrinter;

  /**
   * A list of versions for each package that called this, in order of distance
   * from the caller (the first entry is the furthest package up the call stack).
   *
   * @internal
   */
  private readonly parentVersions: string[];

  /**
   * Construct a BoundaryContractVerifier to allow verifying pre-written contracts.
   *
   * @param config - A ContractCaseBoundaryConfig object for the configuration
   * @param logPrinter - An ILogPrinter to enable printing logs
   * @param resultPrinter - An IResultPrinter to enable printing results
   * @param parentVersions - The names version(s) of the package(s) calling
   * this, where each entry in the array contains a name and version, with the
   * first entry in the array being the furthest package up the call stack.
   */
  constructor(
    config: ContractCaseBoundaryConfig,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter,
    parentVersions: string[],
  ) {
    this.constructorConfig = config;
    this.logPrinter = logPrinter;
    this.resultPrinter = resultPrinter;
    this.parentVersions = parentVersions;
    // If invoked directly, we need to include our version
    if (!parentVersions.includes(versionString)) {
      this.parentVersions = [...parentVersions, versionString];
    } else {
      this.parentVersions = parentVersions;
    }
  }

  private initialiseVerifier() {
    if (this.verifier == null) {
      const { config } = convertConfig(this.constructorConfig);

      if (config.providerName === undefined || config.providerName === '') {
        throw new CaseConfigurationError(
          'Must provide a non-empty providerName',
          'DONT_ADD_LOCATION',
          'INVALID_CONFIG',
        );
      }

      this.verifier = new ContractVerifierConnector(
        config,
        wrapLogPrinter(this.logPrinter, this.resultPrinter),
        [...this.parentVersions],
      );
    }
  }

  /**
   * Returns a description of all of the contracts that can be found by the current configuration.
   *
   * NEVER_THROWS: This method is defined to never throw or reject the promise.
   *
   * @public
   *
   * @returns either a `BoundaryFailure`, or a `BoundarySuccessWithAny` which contains an array of:
   * ```
   * CaseContractDescription {
   *     consumerName: string;
   *     providerName: string;
   * }
   * ```
   */
  availableContractDescriptions(): BoundaryResult {
    try {
      this.initialiseVerifier();
      if (this.verifier === undefined) {
        throw new CaseCoreError(
          'Verifier was undefined after it was initialised (getAvailableContractDescriptions)',
        );
      }

      return new BoundarySuccessWithAny(
        JSON.stringify(this.verifier.getAvailableContractDescriptions()),
      );
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  /**
   * Prepares the verification of the contract(s) that can be found using the configuration provided.
   * If you want to filter the contract(s), use the configOverrides to specify a Consumer or Provider name.
   *
   * NEVER_THROWS: This method is defined to never throw or reject the promise.
   *
   * @public
   *
   * @param configOverrides - A {@link ContractCaseBoundaryConfig} that defines any config options to override
   *     (after the ones provided in the constructor are applied)
   * @param invokeableFns - An object of functions that can be invoked by the verifier, keyed by their function name
   *     (sometimes referred to as a handle)
   *
   * @returns `BoundarySuccessWithAny` containing the prepared tests if the plan was successful, otherwise a `BoundaryFailure`
   */
  prepareVerificationTests(
    configOverrides: ContractCaseBoundaryConfig,
    invokeableFns: Record<string, BoundaryInvokableFunction>,
  ): BoundaryResult {
    try {
      this.initialiseVerifier();
      if (this.verifier === undefined) {
        throw new CaseCoreError(
          'Verifier was undefined after it was initialised (getAvailableContractDescriptions)',
        );
      }
      const { config, partialInvoker } = convertConfig(configOverrides);
      const { config: initialConfig, partialInvoker: initialInvoker } =
        convertConfig(this.constructorConfig);

      return new BoundarySuccessWithAny(
        JSON.stringify(
          this.verifier.prepareVerificationTests(
            mergeInvokers(initialInvoker, partialInvoker),
            mergeConfig(initialConfig, config),
            mapInvokableFunctions(invokeableFns),
          ),
        ),
      );
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  /**
   * Runs a previously prepared verification test.
   *
   * NEVER_THROWS: This method is defined to never throw or reject the promise.
   *
   * @public
   *
   * @param test - A test handle from {@link BoundaryContractVerifier#prepareVerificationTests}
   * @returns A Promise of `BoundarySuccess` if the test was successful, otherwise a `BoundaryFailure`.
   */
  runVerificationTest(
    test: BoundaryContractVerificationTestHandle,
  ): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => {
        this.initialiseVerifier();
        if (this.verifier === undefined) {
          throw new CaseCoreError(
            'Verifier was undefined after it was initialised (getAvailableContractDescriptions)',
          );
        }
        return this.verifier
          .runPreparedTest(test)
          .then(() => new BoundarySuccess());
      })
      .catch((e) => Promise.resolve(jsErrorToFailure(e)));
  }

  /**
   * Closes the prepared verification. This should be called after all tests have been run, and is the step that will
   * publish verification results, etc.
   *
   * NEVER_THROWS: This method is defined to never throw or reject the promise.
   *
   * @public
   *
   * @param contractIndex - A contractIndex returned from {@link prepareVerificationTests}
   *
   * @returns A Promise of `BoundarySuccess` if the test was successful, otherwise a `BoundaryFailure`.
   */
  closePreparedVerification(contractIndex: number): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => {
        this.initialiseVerifier();
        if (this.verifier === undefined) {
          throw new CaseCoreError(
            'Verifier was undefined after it was initialised (getAvailableContractDescriptions)',
          );
        }
        return this.verifier.closePreparedVerification(contractIndex);
      })
      .then((result) => new BoundarySuccessWithAny(JSON.stringify(result)))
      .catch((e) => Promise.resolve(jsErrorToFailure(e)));
  }

  /**
   * Closes the prepared verification. This should be called after all tests have been run, and is the step that will
   * publish verification results, etc.
   *
   * NEVER_THROWS: This method is defined to never throw or reject the promise.
   *
   * @public
   *
   * @returns A Promise of `BoundarySuccess` if the test was successful, otherwise a `BoundaryFailure`.
   */
  closeAllPreparedVerifications(): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => {
        this.initialiseVerifier();
        if (this.verifier === undefined) {
          throw new CaseCoreError(
            'Verifier was undefined after it was initialised (getAvailableContractDescriptions)',
          );
        }
        return this.verifier.closeAllPreparedVerifications();
      })
      .then(() => new BoundarySuccess())
      .catch((e) => Promise.resolve(jsErrorToFailure(e)));
  }
}
