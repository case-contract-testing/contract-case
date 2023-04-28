import { ContractVerifierConnector } from '../connectors';
import {
  MultiTestInvoker,
  RunTestCallback,
} from '../core/executeExample/types';
import { CaseConfig } from '../core/types';
import {
  AnyMockDescriptorType,
  CaseContractDescription,
} from '../entities/types';
import { defaultPrinter } from './defaultTestPrinter';

export class ContractVerifier {
  coreVerifier: ContractVerifierConnector;

  config: CaseConfig;

  constructor(
    config: CaseConfig,
    callback: RunTestCallback,
    printer = defaultPrinter
  ) {
    this.config = config;
    this.coreVerifier = new ContractVerifierConnector(
      config,
      callback,
      printer
    );
  }

  getAvailableContractDescriptions(): CaseContractDescription[] {
    return this.coreVerifier.getAvailableContractDescriptions();
  }

  runVerification<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    configOverrides = this.config
  ): void {
    this.coreVerifier.verifyContract(invoker, configOverrides);
  }
}
