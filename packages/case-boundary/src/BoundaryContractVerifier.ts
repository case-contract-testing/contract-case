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
      'CaseCoreError'
    );
  };

export class BoundaryContractVerifier {
  private verifier: ContractVerifierConnector | undefined;

  private readonly constructorConfig: ContractCaseBoundaryConfig;

  private readonly callback: IRunTestCallback;

  private readonly logPrinter: ILogPrinter;

  private readonly resultPrinter: IResultPrinter;

  private readonly parentVersions: string[];

  constructor(
    config: ContractCaseBoundaryConfig,
    callback: IRunTestCallback,
    logPrinter: ILogPrinter,
    resultPrinter: IResultPrinter,
    parentVersions: string[]
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
      [...this.parentVersions, versionString]
    );
  }

  availableContractDescriptions(): BoundaryResult {
    try {
      this.initialiseVerifier();
      if (this.verifier === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (getAvailableContractDescriptions)'
        );
      }

      return new BoundarySuccessWithAny(
        this.verifier.getAvailableContractDescriptions()
      );
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }

  runVerification(configOverrides: ContractCaseBoundaryConfig): BoundaryResult {
    try {
      this.initialiseVerifier();
      if (this.verifier === undefined) {
        throw new CaseCoreError(
          'Definer was undefined after it was initialised (getAvailableContractDescriptions)'
        );
      }

      const { config, partialInvoker } = convertConfig(configOverrides);
      const { config: initialConfig, partialInvoker: initialInvoker } =
        convertConfig(this.constructorConfig);

      this.verifier.verifyContract(
        { ...initialInvoker, ...partialInvoker },
        { ...initialConfig, ...config }
      );
      return new BoundarySuccess();
    } catch (e) {
      return jsErrorToFailure(e);
    }
  }
}
