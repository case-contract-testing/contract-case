import {
  BoundaryContractVerifier,
  BoundaryResult,
  BoundarySuccess,
  IInvokeCoreTest,
  IRunTestCallback,
} from '@contract-case/case-connector';
import { defaultPrinter } from './defaultTestPrinter.js';

import {
  mapSuccess,
  mapConfig,
  mapSuccessWithAny,
  makeBoundaryFailure,
} from './case-boundary/index.js';
import {
  ContractCaseVerifierConfig,
  ContractDescription,
  RunTestCallback,
  versionString,
} from '../entities/index.js';
import { errorHandler } from './handler.js';

const mapCallback = (callback: RunTestCallback): IRunTestCallback => ({
  runTest: async (
    testName: string,
    invoker: IInvokeCoreTest,
  ): Promise<BoundaryResult> => {
    try {
      callback(testName, () => invoker.verify().then(mapSuccess));
    } catch (e) {
      return makeBoundaryFailure(e as Error);
    }
    return new BoundarySuccess();
  },
});

export class ContractVerifier {
  private boundaryVerifier: BoundaryContractVerifier;

  private config: ContractCaseVerifierConfig;

  constructor(
    config: ContractCaseVerifierConfig,
    callback: RunTestCallback,
    printer = defaultPrinter,
  ) {
    this.config = config;

    try {
      this.boundaryVerifier = new BoundaryContractVerifier(
        mapConfig(config),
        mapCallback(callback),
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
   * Run the verification of the contract(s) that can be found using the configuration provided.
   * If you want to filter the contract(s), use the configOverrides to specify a Consumer or Provider name.
   *
   * @param configOverrides - A `ContractCaseVerifierConfig` that defines any config options to override (after the ones provided in the constructor are applied)
   */
  async runVerification(
    configOverrides: Partial<ContractCaseVerifierConfig> = {},
  ): Promise<void> {
    try {
      mapSuccess(
        await this.boundaryVerifier.runVerification(
          mapConfig({
            ...this.config,
            ...configOverrides,
          } as ContractCaseVerifierConfig),
        ),
      );
    } catch (e) {
      errorHandler(e as Error);
    }
  }
}
