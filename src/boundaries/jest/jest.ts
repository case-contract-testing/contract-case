import { WritingCaseContract } from '../../connectors/contract';
import type { CaseConfig } from '../../connectors/contract/core/types';
import type { RunTestCallback } from '../../connectors/contract/types';
import type { ContractDescription } from '../../entities/types';
import { DefineCaseContract } from '../../connectors/DefineCaseContract';

export const runJestTest: RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
): void => {
  // eslint-disable-next-line jest/expect-expect
  it(`${testName}`, () => verify());
};

type CaseJestConfig = ContractDescription & {
  config?: CaseConfig;
};

type CaseJestCallback = (contract: DefineCaseContract) => void;

export const caseContractWith = (
  { config, ...contractConfig }: CaseJestConfig,
  callback: CaseJestCallback
): void =>
  describe(`Case contract between ${contractConfig.consumerName}`, () => {
    const contract = new WritingCaseContract(contractConfig, {
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      ...(config ? { ...config } : {}),
    });
    afterAll(() => contract.endRecord());

    describe(`and ${contractConfig.providerName}`, () => {
      callback(new DefineCaseContract(contract));
    });
  });
