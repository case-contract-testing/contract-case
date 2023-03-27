import { ContractVerifierConnector } from '../connectors';
import {
  MultiTestInvoker,
  RunTestCallback,
} from '../core/executeExample/types';
import { CaseConfig } from '../core/types';
import { AnyMockDescriptorType, ContractData } from '../entities/types';

export class ContractVerifier {
  coreVerifier: ContractVerifierConnector;

  constructor(
    contractData: ContractData,
    config: CaseConfig,
    callback: RunTestCallback
  ) {
    this.coreVerifier = new ContractVerifierConnector(
      contractData,
      config,
      callback
    );
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>
  ): void {
    this.coreVerifier.verifyContract(invoker);
  }
}
