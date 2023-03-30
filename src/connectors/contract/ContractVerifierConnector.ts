import type { CaseConfig } from '../../core/types';
import type {
  MultiTestInvoker,
  RunTestCallback,
} from '../../core/executeExample/types';
import { ReadingCaseContract } from '../../core/ReadingCaseContract';

import type { AnyMockDescriptorType, ContractData } from '../../entities/types';
import { readerDependencies } from '../dependencies';

export class ContractVerifierConnector {
  contract: ReadingCaseContract;

  callback: RunTestCallback;

  constructor(
    contractData: ContractData,
    config: CaseConfig,
    callback: RunTestCallback,
    dependencies = readerDependencies
  ) {
    this.contract = new ReadingCaseContract(contractData, dependencies, {
      throwOnFail: false,
      ...config,
    });
    this.callback = callback;
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>
  ): void {
    this.contract.verifyContract(invoker, this.callback);
  }
}
