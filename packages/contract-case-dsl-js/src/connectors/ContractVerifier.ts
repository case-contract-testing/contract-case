import {
  BoundaryContractVerifier,
  BoundaryInvokableFunction,
  BoundaryPluginLoader,
} from '@contract-case/case-connector/cjs';

import {
  defaultPrinter,
  mapSuccess,
  mapConfig,
  mapSuccessWithAny,
  mapInvokeableFunction,
  mapContractVerificationHandles,
  errorHandler,
  errorReporter,
  ContractCaseConfigurationError,
  versionString,
} from '@contract-case/contract-case-dsl-js-internals';
import type {
  ContractCaseVerifierConfig,
  ContractDescription,
  VerificationHandle,
  VerificationTestHandle,
} from '@contract-case/contract-case-dsl-js-internals';

export class ContractVerifier {
  private boundaryVerifier: BoundaryContractVerifier;

  private config: ContractCaseVerifierConfig;

  private invokeableFunctions: Record<string, BoundaryInvokableFunction>;

  private printer: typeof defaultPrinter;

  constructor(config: ContractCaseVerifierConfig, printer = defaultPrinter) {
    this.config = config;
    this.invokeableFunctions = {};
    this.printer = printer;

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
   * Loads one or more plugins, which must be the names of plugin packages
   * installed in the current project (eg with `npm install --save-dev`).
   *
   * Call this before preparing or running any verification tests that need
   * the plugin(s).
   *
   * @param pluginNames - The names of the plugin packages to load.
   * @returns a Promise that resolves once the plugins are loaded.
   */
  loadPlugins(...pluginNames: string[]): Promise<void> {
    return new BoundaryPluginLoader(
      mapConfig({ ...this.config, testRunId: 'VERIFICATION_LOAD_PLUGIN' }),
      this.printer,
      this.printer,
      [versionString],
    )
      .loadPlugins(pluginNames)
      .then(mapSuccess)
      .catch(errorHandler);
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
