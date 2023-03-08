import { makeLogger } from '../../connectors/logger';
import { resultPrinter } from '../../connectors/resultPrinter';

import type { CaseConfig } from '../../core/types';
import type {
  MultiTestInvoker,
  RunTestCallback,
} from '../../core/contract/executeExample/types';
import { ReadingCaseContract } from '../../core/contract/ReadingCaseContract';

import type { AnyMockDescriptorType, ContractFile } from '../../entities/types';

export class ContractVerifier {
  contract: ReadingCaseContract;

  callback: RunTestCallback;

  constructor(
    contractData: ContractFile,
    config: CaseConfig,
    callback: RunTestCallback
  ) {
    this.contract = new ReadingCaseContract(
      contractData,
      resultPrinter,
      makeLogger,
      config
    );
    this.callback = callback;
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>
  ): void {
    this.contract.verifyContract(invoker, this.callback);
  }
}
