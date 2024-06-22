import { ContractCaseDefiner } from '../../connectors/ContractDefiner.js';
import { ContractVerifier } from '../../connectors/ContractVerifier.js';
import { RunTestCallback } from '../../entities/index.js';
import type {
  ContractCaseJestConfig,
  ContractCaseJestVerifierConfig,
  DefineCaseJestCallback,
  VerifyCaseJestCallback,
} from './types.js';

const TIMEOUT = 30000;

const runJestTest: RunTestCallback = (
  testName: string,
  verify: () => Promise<unknown>,
): void => {
  // eslint-disable-next-line jest/expect-expect
  it(`${testName}`, () => verify(), TIMEOUT);
};

export const defineContract = (
  config: ContractCaseJestConfig,
  callback: DefineCaseJestCallback,
): void =>
  describe(`Case contract definition`, () => {
    const contract = new ContractCaseDefiner({
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      ...config,
    });

    afterAll(() => contract.endRecord(), TIMEOUT);

    describe(`between ${config.consumerName} and ${config.providerName}`, () => {
      jest.setTimeout(TIMEOUT);

      callback(contract);
    });
  });

export const verifyContract = (
  config: ContractCaseJestVerifierConfig,
  callback: VerifyCaseJestCallback,
): void => {
  if (!config.providerName) {
    throw new Error('Must specify a providerName to verify');
  }
  describe(`Provider verification for ${config.providerName}`, () => {
    callback(new ContractVerifier(config, runJestTest));
    it('[ContractCase Internals] Init', () => {});
  });
};
