import {
  BoundaryContractVerifier,
  BoundaryResult,
  BoundarySuccess,
  IInvokeCoreTest,
  IRunTestCallback,
} from '@contract-case/case-boundary';
import { defaultPrinter } from './defaultTestPrinter';

import {
  mapSuccess,
  mapConfig,
  mapSuccessWithAny,
  makeBoundaryFailure,
} from './case-boundary';
import {
  ContractCaseVerifierConfig,
  ContractDescription,
  RunTestCallback,
} from '../entities';
import { errorHandler } from './handler';

const mapCallback = (callback: RunTestCallback): IRunTestCallback => ({
  runTest: (testName: string, invoker: IInvokeCoreTest): BoundaryResult => {
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
    printer = defaultPrinter
  ) {
    this.config = config;

    try {
      this.boundaryVerifier = new BoundaryContractVerifier(
        mapConfig(config),
        mapCallback(callback),
        printer,
        printer
      );
    } catch (e) {
      // Hack since this object isn't constructed anyway
      this.boundaryVerifier =
        'UNASSIGNED' as unknown as BoundaryContractVerifier;
      errorHandler(e as Error);
    }
  }

  availableContractDescriptions(): ContractDescription[] {
    try {
      return mapSuccessWithAny(
        this.boundaryVerifier.availableContractDescriptions()
      );
    } catch (e) {
      return errorHandler(e as Error);
    }
  }

  runVerification(configOverrides: Partial<ContractCaseVerifierConfig>): void {
    try {
      mapSuccess(
        this.boundaryVerifier.runVerification(
          mapConfig({
            ...this.config,
            ...configOverrides,
          } as ContractCaseVerifierConfig)
        )
      );
    } catch (e) {
      errorHandler(e as Error);
    }
  }
}
