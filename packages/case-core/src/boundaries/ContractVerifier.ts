import { ContractVerifierConnector } from '../connectors';
import {
  MultiTestInvoker,
  RunTestCallback,
} from '../core/executeExample/types';
import { CaseConfig } from '../core/types';
import { AnyMockDescriptorType, ContractDescription } from '../entities/types';

export class ContractVerifier {
  coreVerifier: ContractVerifierConnector;

  config: CaseConfig;

  constructor(config: CaseConfig, callback: RunTestCallback) {
    this.config = config;
    this.coreVerifier = new ContractVerifierConnector(config, callback);
  }

  getAvailableContractDescriptions(): ContractDescription[] {
    return this.coreVerifier.getAvailableContractDescriptions();
  }

  runVerification<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>,
    configOverrides = this.config
  ): void {
    this.coreVerifier.verifyContract(invoker, configOverrides);
  }
}
