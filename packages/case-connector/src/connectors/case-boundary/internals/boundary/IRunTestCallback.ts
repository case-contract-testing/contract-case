import { BoundaryResult } from './Result';

/**
 * Interface to tell ContractCase to run the test indicated in a call to an
 * IRunTestCallback
 *
 * @public
 */
export interface IInvokeCoreTest {
  /**
   * Call this to tell the ContractCase core to actually invoke the test.
   *
   * Note that during verification, a failed verification doesn't return an error
   * Result, but failed configuration or core bugs will. This is the intended default
   * behaviour - as a failed verification doesn't necessarily indicate a problem
   * in the code that is being verified.
   *
   * @returns a promise that indicates the result of verifying this test (BoundaryResult)
   */
  verify(): Promise<BoundaryResult>;
}

/**
 * This interface allows the DSL layer to invoke the test. If your test runner
 * supports programmatically running different tests, then use this interface to
 * tell a BoundaryContractVerifier how to call back to your DSL with a test name
 *
 * @public
 */
export interface IRunTestCallback {
  /**
   * Called once for each test in a Verification run. In an implementation, you
   * should tell your test runner that it is running a test, and what the name
   * of the test is.
   *
   * @param testName - The name of this test
   * @param invoker - an IInvokeCoreTest to tell the ContractCase core that
   * you'd like it to run the test.
   * @returns a promise that indicates the result of calling the invoker (BoundaryResult)
   */
  runTest(testName: string, invoker: IInvokeCoreTest): Promise<BoundaryResult>;
}
