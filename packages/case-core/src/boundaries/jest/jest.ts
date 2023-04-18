import type { CaseConfig } from '../../core/types';
import type { RunTestCallback } from '../../core/executeExample/types';
import type { AnyMockDescriptorType } from '../../entities/types';
import type {
  CaseJestConfig,
  DefineCaseJestCallback,
  VerifyCaseJestCallback,
} from './types';
import { ContractDefiner } from '../ContractDefiner';
import { ContractVerifier } from '../ContractVerifier';

const TIMEOUT = 30000;

const runJestTest: RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>
): void => {
  // eslint-disable-next-line jest/expect-expect
  it(`${testName}`, () => verify(), TIMEOUT);
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

    afterAll(() => contract.endRecord(), TIMEOUT);

    describe(`between ${contractConfig.consumerName} and ${contractConfig.providerName}`, () => {
      jest.setTimeout(30000);

      callback(contract);
    });
  });

export const verifyContract = (
  config: CaseConfig,
  callback: VerifyCaseJestCallback
): void => {
  if (!config.providerName) {
    throw new Error('Must specify a providerName to verify');
  }
  describe(`Provider verification for ${config.providerName}`, () => {
    callback(new ContractVerifier(config, runJestTest));
  });
};
