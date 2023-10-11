import {
  CaseConfigurationError,
  CaseCoreError,
  ContractVerifierConnector,
  RunTestCallback,
} from '@contract-case/case-core';
import {
  convertConfig,
  handleVoidResult,
  jsErrorToFailure,
  wrapLogPrinter,
} from './mappers';
import { IInvokeCoreTest, IRunTestCallback } from './boundary/IRunTestCallback';
import {
  ILogPrinter,
  IResultPrinter,
  ContractCaseBoundaryConfig,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithAny,
} from './boundary';
import { versionString } from './versionString';

class CoreInvoker implements IInvokeCoreTest {
  private coreVerify: () => Promise<unknown>;

  constructor(coreVerify: () => Promise<unknown>) {
    this.coreVerify = coreVerify;
  }

  async verify(): Promise<BoundaryResult> {
    return this.coreVerify()
      .then(() => new BoundarySuccess())
      .catch(jsErrorToFailure);
  }
}

const wrapCallback =
  (callback: IRunTestCallback): RunTestCallback =>
  (testName: string, verify: () => Promise<unknown>) => {
    handleVoidResult(
      callback.runTest(testName, new CoreInvoker(verify)),
      'CaseCoreError',
    );
  };

/**
 * A BoundaryContractDefiner allows verifying contracts
 *
 * @public
 */
export class BoundaryContractVerifier {
  private verifier: ContractVerifierConnector | undefined;

  private readonly constructorConfig: ContractCaseBoundaryConfig;

  private readonly callback: IRunTestCallback;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

  private readonly parentVersions: string[];

  /**
   * Construct a BoundaryContractVerifier to allow verifying pre-written contracts.
   *
   * @param config - A ContractCaseBoundaryConfig object for the configuration
   * @param IRunTestCallback - The callback to tell the test runner that it is running a test
   * @param logPrinter - An ILogPrinter to enable printing logs
   * @param resultPrinter - An IResultPrinter to enable printing results
   * @param parentVersions - The names version(s) of the package(s) calling
   * this, where each entry in the array contains a name and version, with the
   * first entry in the array being the furthest package up the call stack.
   */
  constructor(
    config: ContractCaseBoundaryConfig,
    callback: IRunTestCallback,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter,
    parentVersions: string[],
  ) {
    this.constructorConfig = config;
    this.callback = callback;
    this.logPrinter = logPrinter;
    this.resultPrinter = resultPrinter;
    this.parentVersions = parentVersions;
  }

  private initialiseVerifier() {
    const { config } = convertConfig(this.constructorConfig);

    if (config.providerName === undefined || config.providerName === '') {
      throw new CaseConfigurationError('Must provide a non-empty providerName');
    }

    this.verifier = new ContractVerifierConnector(
      config,
      wrapCallback(this.callback),
      wrapLogPrinter(this.logPrinter, this.resultPrinter),
      [...this.parentVersions, versionString],
    );
  }

  /**
   * Returns a description of all of the contracts that can be found by the configuration.
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
          'Definer was undefined after it was initialised (getAvailableContractDescriptions)',
        );
      }

      return new BoundarySuccessWithAny(
        this.verifier.getAvailableContractDescriptions(),
      );
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  /**
   * Run the verification of the contract(s) that can be found using the configuration provided.
   * If you want to filter the contract(s), use the configOverrides to specify a Consumer or Provider name.
   *
   * @param configOverrides - A `ContractCaseBoundaryConfig` that defines any config options to override (after the ones provided in the constructor are applied)
   *
   * @returns `BoundarySuccess` if verification was successful, otherwise a `BoundaryFailure`
   */
  runVerification(configOverrides: ContractCaseBoundaryConfig): BoundaryResult {
    try {
      this.initialiseVerifier();
      if (this.verifier === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (getAvailableContractDescriptions)',
        );
      }

      const { config, partialInvoker } = convertConfig(configOverrides);
      const { config: initialConfig, partialInvoker: initialInvoker } =
        convertConfig(this.constructorConfig);

      this.verifier.verifyContract(
        { ...initialInvoker, ...partialInvoker },
        { ...initialConfig, ...config },
      );
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }
}
