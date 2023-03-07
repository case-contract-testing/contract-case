import {
  ReadingCaseContract,
  WritingCaseContract,
} from '../../connectors/contract';
import type { CaseConfig } from '../../connectors/contract/core/types';
import type {
  MultiTestInvoker,
  RunTestCallback,
} from '../../connectors/contract/types';
import type {
  AnyMockDescriptorType,
  ContractDescription,
  ContractFile,
} from '../../entities/types';
import { ContractDefiner } from '../../connectors/ContractDefiner';

type CaseJestConfig = ContractDescription & {
  config?: CaseConfig;
};

type DefineCaseJestCallback = (contract: ContractDefiner) => void;

const runJestTest: RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
): void => {
  // eslint-disable-next-line jest/expect-expect
  it(`${testName}`, () => verify());
};

class ContractVerifier {
  contract: ReadingCaseContract;

  constructor(contract: ReadingCaseContract) {
    this.contract = contract;
  }

  verifyContract<T extends AnyMockDescriptorType>(
    invoker: MultiTestInvoker<T>
  ): void {
    this.contract.verifyContract(invoker, runJestTest);
  }
}
type VerifiyCaseJestCallback = (contract: ContractVerifier) => void;

export const defineContract = (
  { config, ...contractConfig }: CaseJestConfig,
  callback: DefineCaseJestCallback
): void =>
  describe(`Case contract definition`, () => {
    const contract = new WritingCaseContract(contractConfig, {
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      ...(config ? { ...config } : {}),
    });
    afterAll(() => contract.endRecord());

    describe(`between ${contractConfig.consumerName} and ${contractConfig.providerName}`, () => {
      callback(new ContractDefiner(contract));
    });
  });

export const verifyContract = (
  contract: ContractFile,
  config: CaseConfig,
  callback: VerifiyCaseJestCallback
): void =>
  describe('Case contract verification', () => {
    const verifier = new ReadingCaseContract(contract, config);

    describe(``, () => {
      callback(new ContractVerifier(verifier));
    });
  });
