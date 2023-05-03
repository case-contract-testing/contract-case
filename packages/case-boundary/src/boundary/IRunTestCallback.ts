import { BoundaryResult } from './Result';

/**
 * Interface to tell ContractCase to run the test indicated in a call to an
 * IRunTestCallback
 */
export interface IInvokeCoreTest {
  /**
   * Call this to tell the ContractCase core to actually invoke the test. During
   * verification, by default failed verification doesn't return an error
   * Result, but failed configuration or core bugs will.
   */
  verify(): Promise<BoundaryResult>;
}

/**
 * This interface allows the DSL layer to invoke the test. If your test runner
 * supports programmatically running different tests, then use this interface to
 * tell a BoundaryContractVerifier how to call back to your DSL with a test name
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
   */
  runTest(testName: string, invoker: IInvokeCoreTest): BoundaryResult;
}
