import type { CaseConfig } from '../../core/types';
import type { RunTestCallback } from '../../core/contract/executeExample/types';
import type { AnyMockDescriptorType, ContractFile } from '../../entities/types';
import { ContractDefiner } from '../../connectors/contract/ContractDefiner';
import { ContractVerifier } from '../../connectors/contract/ContractVerifier';
import type {
  CaseJestConfig,
  DefineCaseJestCallback,
  VerifiyCaseJestCallback,
} from './types';

const runJestTest: RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
): void => {
  // eslint-disable-next-line jest/expect-expect
  it(`${testName}`, () => verify());
};

export const defineContract = <T extends AnyMockDescriptorType>(
  { config, ...contractConfig }: CaseJestConfig<T>,
  callback: DefineCaseJestCallback
): void =>
  describe(`Case contract definition`, () => {
    const { stateHandlers, triggers, ...contextConfig } = config || {};

    const contract = new ContractDefiner(
      contractConfig,
      {
        testRunId:
          process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
        ...contextConfig,
      },
      { stateHandlers, triggers }
    );

    afterAll(() => contract.endRecord());

    describe(`between ${contractConfig.consumerName} and ${contractConfig.providerName}`, () => {
      callback(contract);
    });
  });

export const verifyContract = (
  contract: ContractFile,
  config: CaseConfig,
  callback: VerifiyCaseJestCallback
): void =>
  describe('Case contract verification', () => {
    describe(``, () => {
      callback(new ContractVerifier(contract, config, runJestTest));
    });
  });
