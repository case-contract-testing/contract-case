/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-export */
import { ContractCaseDefiner } from '../../connectors/ContractDefiner.js';
import { ContractVerifier } from '../../connectors/ContractVerifier.js';
import { ContractWriteSuccess } from '../../entities/index.js';
import type {
  ContractCaseJestConfig,
  ContractCaseJestVerifierConfig,
  DefineCaseJestCallback,
  VerifyCaseJestCallback,
} from './types.js';

const TIMEOUT = 30000;
/**
 * Convenience wrapper for defining contracts
 *
 * @param config - Configuration for this definition run (may be overridden in individual tests)
 * @param callback - The test definitions
 * @param onContractDefineSuccess - An optional callback to call if the contract was written successfully
 * @returns
 */
export const defineContract = (
  config: ContractCaseJestConfig,
  callback: DefineCaseJestCallback,
  onContractDefineSuccess: (
    details: ContractWriteSuccess,
  ) => Promise<void> | void = () => {},
): void =>
  describe(`Case contract definition`, () => {
    const contract = new ContractCaseDefiner({
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      ...config,
    });

    afterAll(() => contract.endRecord().then(onContractDefineSuccess), TIMEOUT);

    describe(`between ${config.consumerName} and ${config.providerName}`, () => {
      jest.setTimeout(TIMEOUT);

      callback(contract);
    });
  });

export const verifyContract = (
  config: ContractCaseJestVerifierConfig,
  setupCallback: VerifyCaseJestCallback = () => {},
): void => {
  if (!config.providerName) {
    throw new Error('Must specify a providerName to verify');
  }
  describe(`Provider verification for ${config.providerName}`, () => {
    const verifier = new ContractVerifier(config);
    jest.setTimeout(TIMEOUT);

    setupCallback(verifier);

    const tests = verifier.prepareVerificationTests(config);

    tests.forEach((verificationTest) => {
      it(`${verificationTest.testName}`, () =>
        verifier.runPreparedTest(verificationTest));
    });
    // TODO: Determine whether Jest runs tests in order always, and if not, do something else here.
    it('Overall verification result', () =>
      verifier.closePreparedVerification());
  });
};
