import {
  BoundaryContractVerifier,
  BoundaryInvokableFunction,
} from '@contract-case/case-connector/cjs';
import { defaultPrinter } from './defaultTestPrinter.js';

import {
  mapSuccess,
  mapConfig,
  mapSuccessWithAny,
  mapInvokeableFunction,
  mapContractVerificationHandles,
} from './case-boundary/index.js';
import {
  ContractCaseConfigurationError,
  ContractCaseVerifierConfig,
  ContractDescription,
  VerificationHandle,
  VerificationTestHandle,
  versionString,
} from '../entities/index.js';
import { errorHandler, errorReporter } from './handler.js';

export class ContractVerifier {
  private boundaryVerifier: BoundaryContractVerifier;

  private config: ContractCaseVerifierConfig;

  private invokeableFunctions: Record<string, BoundaryInvokableFunction>;

  constructor(config: ContractCaseVerifierConfig, printer = defaultPrinter) {
    this.config = config;
    this.invokeableFunctions = {};

    try {
      this.boundaryVerifier = new BoundaryContractVerifier(
        mapConfig(config),
        printer,
        printer,
        [versionString],
      );
    } catch (e) {
      // Hack since this object isn't constructed anyway
      this.boundaryVerifier =
        'UNASSIGNED' as unknown as BoundaryContractVerifier;
      errorHandler(e as Error);
    }
  }

  /**
   * Get a list of the contract descriptions that are available for verification given the provided configuration.
   *
   * @returns An array of `ContractDescription` objects.
   */
  availableContractDescriptions(): ContractDescription[] {
    try {
      return mapSuccessWithAny(
        this.boundaryVerifier.availableContractDescriptions(),
      );
    } catch (e) {
      return errorHandler(e as Error);
    }
  }

  /**
   * Registers a function that can be invoked by ContractCase during a verification.
   *
   * Required by some mock types, like mock function caller.
   *
   * @param handle - The string name of the function. Must be unique, and must match the expectation configured in the Example.
   * @param invokeableFn - The function to invoke
   */
  registerFunction(
    handle: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invokeableFn: (...args: any[]) => any,
  ): void {
    if (handle in this.invokeableFunctions) {
      throw new ContractCaseConfigurationError(
        `The function named '${handle}' has already been registered. You must only register functions once`,
        undefined,
        undefined,
        'UNDOCUMENTED',
      );
    }
    this.invokeableFunctions[handle] = mapInvokeableFunction(invokeableFn);
  }

  /**
   * Get the tests to run during the verification of the contract(s),
   * that can be found using the configuration provided.
   *
   * If you want to filter the contract(s), use the configOverrides to specify a Consumer or Provider name.
   *
   * @param configOverrides - A `ContractCaseVerifierConfig` that defines any config options to override (after the ones provided in the constructor are applied)
   */
  prepareVerificationTests(
    configOverrides: Partial<ContractCaseVerifierConfig> = {},
  ): VerificationHandle[] {
    try {
      return mapContractVerificationHandles(
        this.boundaryVerifier.prepareVerificationTests(
          mapConfig({
            ...this.config,
            ...configOverrides,
          } as ContractCaseVerifierConfig),
          this.invokeableFunctions,
        ),
      );
    } catch (e) {
      throw errorReporter(e as Error);
    }
  }

  /**
   * Get the tests to run during the verification of the contract(s),
   * that can be found using the configuration provided.
   *
   * If you want to filter the contract(s), use the configOverrides to specify a Consumer or Provider name.
   *
   * @param configOverrides - A `ContractCaseVerifierConfig` that defines any config options to override (after the ones provided in the constructor are applied)
   */
  async runPreparedTest(
    verificationTest: VerificationTestHandle,
  ): Promise<void> {
    try {
      mapSuccess(
        await this.boundaryVerifier.runVerificationTest(verificationTest),
      );
    } catch (e) {
      throw errorReporter(e as Error);
    }
  }

  async closePreparedVerification(contractIndex: number): Promise<void> {
    try {
      mapSuccessWithAny(
        await this.boundaryVerifier.closePreparedVerification(contractIndex),
      );
    } catch (e) {
      throw errorReporter(e as Error);
    }
  }
}
