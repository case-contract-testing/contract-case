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
    this.boundaryVerifier = new BoundaryContractVerifier(
      mapConfig(config),
      mapCallback(callback),
      printer,
      printer
    );
  }

  availableContractDescriptions(): ContractDescription[] {
    return mapSuccessWithAny(
      this.boundaryVerifier.availableContractDescriptions()
    );
  }

  runVerification(configOverrides: Partial<ContractCaseVerifierConfig>): void {
    mapSuccess(
      this.boundaryVerifier.runVerification(
        mapConfig({
          ...this.config,
          ...configOverrides,
        } as ContractCaseVerifierConfig)
      )
    );
  }
}
