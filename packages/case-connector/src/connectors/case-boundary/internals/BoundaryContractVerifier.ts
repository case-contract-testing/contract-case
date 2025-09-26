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
 * A BoundaryContractDefiner allows verifying contracts
 *
 * @public
 */
export class BoundaryContractVerifier {
  private verifier: ContractVerifierConnector | undefined;

  private readonly constructorConfig: ContractCaseBoundaryConfig;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

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
   * @param configOverrides - A `ContractCaseBoundaryConfig` that defines any config options to override (after the ones provided in the constructor are applied)
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

  closePreparedVerification(): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => {
        this.initialiseVerifier();
        if (this.verifier === undefined) {
          throw new CaseCoreError(
            'Verifier was undefined after it was initialised (getAvailableContractDescriptions)',
          );
        }
        return this.verifier.closePreparedVerification();
      })
      .then(() => new BoundarySuccess())
      .catch((e) => Promise.resolve(jsErrorToFailure(e)));
  }
}
