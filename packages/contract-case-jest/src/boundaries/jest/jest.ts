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

/**
 * @internal
 * The timeout to use to override jest's default timeout.
 *
 * If you update this, make sure you update the comments in {@link defineContract} and {@link verifyContract}.
 */
const TIMEOUT = 30000;

/**
 * Convenience wrapper for defining contracts
 *
 * @param config - Configuration for this definition run (may be overridden in individual tests)
 * @param setupCallback - The test definitions
 * @param onContractDefineSuccess - An optional callback to call if the contract was written successfully
 * @param timeoutMillis - An optional timeout to set for jest's hooks and tests. Defaults to 30000
 * @returns
 */
export const defineContract = (
  config: ContractCaseJestConfig,
  setupCallback: DefineCaseJestCallback,
  onContractDefineSuccess: (
    details: ContractWriteSuccess,
  ) => Promise<void> | void = () => {},
  timeoutMillis: number = TIMEOUT,
): void =>
  describe(`Case contract definition`, () => {
    const contract = new ContractCaseDefiner({
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      ...config,
    });

    afterAll(
      () => contract.endRecord().then(onContractDefineSuccess),
      timeoutMillis,
    );

    describe(`between ${config.consumerName} and ${config.providerName}`, () => {
      jest.setTimeout(timeoutMillis);

      setupCallback(contract);
    });
  });

/**
 * Convenience wrapper for verifying contracts. Calling this will generate all the tests
 * you need for
 *
 * @param config - Configuration for this verification run
 * @param setupCallback - Optional. Called with the contract verifier before any tests are run. You can use this to do any
 * computed setup necessary
 * @param verificationCompleteCallback - Optional. Called once the verification is complete. In a future release, this will contain the details
 * of the verification success / failure.
 * @param timeoutMillis - An optional timeout to set for jest's hooks and tests. Defaults to 30000
 * @returns
 */
export const verifyContract = (
  config: ContractCaseJestVerifierConfig,
  setupCallback: VerifyCaseJestCallback = () => {},
  verificationComplete = () => {},
  timeoutMillis: number = TIMEOUT,
): void => {
  if (!config.providerName) {
    throw new Error('Must specify a providerName to verify');
  }
  describe(`Provider verification for ${config.providerName}`, () => {
    const verifier = new ContractVerifier(config);
    jest.setTimeout(timeoutMillis);

    setupCallback(verifier);

    const tests = verifier.prepareVerificationTests(config);

    tests.forEach((verificationTest) => {
      it(`${verificationTest.testName}`, () =>
        verifier.runPreparedTest(verificationTest));
    });
    // TODO: Determine whether Jest runs tests in order always, and if not, do something else here.
    it('Overall verification result', () =>
      verifier.closePreparedVerification().then(
        () => {
          verificationComplete();
        },
        (e) => {
          verificationComplete();
          throw e;
        },
      ));
  });
};
