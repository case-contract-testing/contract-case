/**
 * These are the error codes, emitted by every CaseConfigurationError.
 * The documentation here provides additional information that should hopefully help if the
 * information in the error message is unclear.
 *
 * Some of the errors print advice. This advice can be overridden by setting
 * an entry in the `adviceOverrides` configuration map (keyed by the error code
 * that you want to override errors for). This feature exists for users who have
 * wrapped ContractCase with some common boilerplate, or who have a dedicated
 * team looking after their contract testing infrastructure.
 *
 * @public
 */
export interface ConfigurationErrorCodes {
  /**
   * Used for when a file access problem happened trying to write a contract file.
   * This usually means ContractCase has been given a bad path, is out of disk
   * space, or some other I/O error has occurred.
   *
   * The error message should have additional information.
   */
  DISK_IO_PROBLEM: 'DISK_IO_PROBLEM';

  /**
   * Used when the DSL declaration to generate matchers for a particular language is not valid.
   *
   * This usually means that the DSL declaration doesn't match the expected format.
   *
   * See the error message alongside this code for additional information.
   */
  BAD_DSL_DECLARATION: 'BAD_DSL_DECLARATION';

  /**
   * Used when an interaction definition isn't valid.
   *
   * Because interaction definitions are very flexible,
   * it's sometimes possible to pass the wrong matcher at an inappropriate
   * time. For example, it could be possible to specify that an http response
   * code must be a complex object - which should never be possible.
   *
   * If you're getting this code, it means that the matching engine has
   * discovered that the expectations in your interaction aren't valid.
   *
   * Although the type system tries to prevent invalid interaction
   * definitions, this isn't always possible in all target languages, so
   * ContractCase's default plugins try to detect this and fail with a helpful
   * error message.
   *
   * Usually this means you'll need to update your interaction definition. The
   * error message should have more information.
   *
   */
  BAD_INTERACTION_DEFINITION: 'BAD_INTERACTION_DEFINITION';

  /**
   * The fake function set up by contract case was never called.
   *
   * This usually means there's an error in the trigger code under test.
   * It means there was an expectation set up the trigger code would call
   * a function (eg an endpoint, or a function call), but no such call ever arrived.
   *
   * Depending on the interaction type, this may mean that you are calling the wrong
   * endpoint, a different service, or simply not making any calls.
   *
   * Check that your code under test is correctly calling the fake service set up
   * by this interaction.
   */
  FAKE_NEVER_CALLED: 'FAKE_NEVER_CALLED';

  /**
   * Used for when a configuration value is outside its normal range. The error message alongside this code should
   * tell you what specifically went wrong.
   *
   * In most cases this class of error is prevented with the type system.
   */
  INVALID_CONFIG: 'INVALID_CONFIG';

  /**
   * A lifecycle method was called out of order.
   *
   * Check that your code has the method calls in the right order.
   *
   * Although care has been taken to prevent invalid lifecycle calls from
   * being possible, there are still some cases where this can happen.
   *
   * For contract definition, it should be:
   *
   * 1. Begin definition
   *
   * 2. Multiple calls to runInteraction or your language's equivalent of
   *    runRejectingInteraction
   *
   * 3. End record (writing the contract).
   *
   * Check that you're not accidentally reusing test instances between runs.
   *
   */
  INVALID_LIFECYCLE: 'INVALID_LIFECYCLE';

  /**
   * The current interaction was configured to have a particular state setup
   * handler, but it was missing.
   *
   * State handlers are functions that you define to set up a particular state
   * within your code (for example, an interaction on an HTTP provider might
   * have a state named `'User with id 123 exists'`).
   *
   * This error indicates that Contractcase was expecting a named state handler,
   * but it couldn't find it.
   *
   * This usually indicates a misconfiguration - check that you have provided
   * a state handler with the exact name of the handler that was missing in
   * the configuration of your test.
   *
   * If you need help investigating this error, you can set the configuration
   * property `logLevel` to `'DEBUG'` to see a list of the configured state
   * handlers.
   *
   */
  MISSING_STATE_HANDLER: 'MISSING_STATE_HANDLER';
  /**
   * The current interaction needs a trigger defined, but there wasn't one configured.
   *
   * Trigger functions are what ContractCase uses to kick off an interaction. They're used
   * to trigger the code under test.
   *
   * This error is most likely to be experienced:
   *
   * - If you've forgotten the `trigger` part of a `runInteraction`
   * - If you're verifying a contract that needs triggers provided (for example, an HTTP server contract).
   *
   * In the latter case, triggers need to
   * be keyed exactly by the name of the request - for example, "A request to get user".
   *
   * Check that your CaseConfig has the appropriate triggers set.
   *
   */
  MISSING_TRIGGER_FUNCTION: 'MISSING_TRIGGER_FUNCTION';
  /**
   * The current interaction needs a response test defined, but there wasn't one configured.
   *
   * After the code under test has been called, the response from it must be tested. You
   * provide a test-response or test-error-response function to check that the code under test
   * has correctly understood the response.
   *
   * This error is most likely to be experienced:
   *
   * - If you've provided a `testResponse` but you need to provide a `testErrorResponse` (or vice versa).
   * - If you're verifying a contract that needs triggers provided (for example, an HTTP server contract), and
   * you don't have the test response implemented.
   *
   * In the latter case, response tests need to
   * be keyed exactly by the name of the response - for example, "throwing a UserNotFound Exception" or "returns null".
   *
   * Check that your CaseConfig has the appropriate response test functions set.
   *
   */
  MISSING_TEST_FUNCTION: 'MISSING_TEST_FUNCTION';
  /**
   * The current interaction needs a user-provided function registered with ContractCase.
   *
   * When the contract expects a function that can be called by ContractCase, you must first
   * register it with `registerFunction` so that it can be called during the interaction.
   *
   * If you experience this when verifying a new version of an existing contract,
   * it may be because the contract has changed to expect a call to a function name
   * that wasn't previously in the contract.
   *
   * Check that you have registered all the functions that the contract expects.
   *
   */
  MISSING_REGISTERED_FUNCTION: 'MISSING_REGISTERED_FUNCTION';
  /**
   * Tried to publish verification results for a contract that doesn't have
   * information on where to publish the verification results.
   *
   * This can happen if you're sharing contracts locally, but still have
   * publishing verification results enabled.
   */
  NON_BROKERED_CONTRACT: 'NON_BROKERED_CONTRACT';
  /**
   * The existing contract didn't match the new contract being written.
   *
   * This is an error when ContractCase is running in validate snapshot mode,
   * where defined contracts are checked against the contract on disk, and
   * a failure happens if the new contract is different.
   *
   * To address this, you'll need to run contract definitions with
   * a changedContracts behaviour set to overwrite the contract instead of check.
   *
   * Please re-run your tests with one of:
   *
   * - The configuration property changedContracts is set to 'OVERWRITE'
   *
   * - The environment variable CASE_changedContracts=OVERWRITE
   *
   * If you see this on consecutive runs, please check
   * that your contract doesn't contain randomness
   * during contract definition
   */
  OVERWRITE_CONTRACTS_NEEDED: 'OVERWRITE_CONTRACTS_NEEDED';
  /**
   * Used when there is no additional documentation for this error code.
   *
   * Long term, this code should be removed, and all configuration errors should have documentation.
   *
   * This code doesn't have any behaviour when set as an `adviceOverride`.
   */
  UNDOCUMENTED: 'UNDOCUMENTED';
  /**
   * This error code is never emitted, it exists to allow the advice given in the crash reporter to be overridden.
   *
   * Hopefully, you didn't know the crash reporter exists - when ContractCase
   * crashes, it prints the stack trace and asks the user to report the crash as
   * a bug. This code can be used to replace the bug report request part of the crash report.
   */
  CASE_CRASH_ADVICE: 'CASE_CRASH_ADVICE';
}

/**
 * Describes error codes from Core Erorrs (ie, when the framework is broken).
 *
 * Mostly here so that adviceOverrides can override the crash advice, which
 * you may want to do in corporate environments where you have a team looking
 * after your test infrastructure.
 *
 * @public
 */
export interface CoreErrorCodes {
  /**
   * Used to control the advice printed when ContractCase crashes.
   */
  CASE_CRASH_ADVICE: 'CASE_CRASH_ADVICE';
}

/**
 * A convenience type for all the error codes emitted by ContractCase.
 *
 * @public
 */
export type ErrorCodeDefinitions = {
  configuration: ConfigurationErrorCodes;
  core: CoreErrorCodes;
};

/**
 * A corresponding lookup object for the error codes, allowing easy programmatic use.
 *
 * @public
 */
export const ErrorCodes: ErrorCodeDefinitions = {
  configuration: {
    DISK_IO_PROBLEM: 'DISK_IO_PROBLEM',
    BAD_INTERACTION_DEFINITION: 'BAD_INTERACTION_DEFINITION',
    FAKE_NEVER_CALLED: 'FAKE_NEVER_CALLED',
    BAD_DSL_DECLARATION: 'BAD_DSL_DECLARATION',
    INVALID_CONFIG: 'INVALID_CONFIG',
    INVALID_LIFECYCLE: 'INVALID_LIFECYCLE',
    MISSING_STATE_HANDLER: 'MISSING_STATE_HANDLER',
    MISSING_TEST_FUNCTION: 'MISSING_TEST_FUNCTION',
    MISSING_TRIGGER_FUNCTION: 'MISSING_TRIGGER_FUNCTION',
    MISSING_REGISTERED_FUNCTION: 'MISSING_REGISTERED_FUNCTION',
    NON_BROKERED_CONTRACT: 'NON_BROKERED_CONTRACT',
    OVERWRITE_CONTRACTS_NEEDED: 'OVERWRITE_CONTRACTS_NEEDED',
    UNDOCUMENTED: 'UNDOCUMENTED',
    CASE_CRASH_ADVICE: 'CASE_CRASH_ADVICE',
  },
  core: {
    CASE_CRASH_ADVICE: 'CASE_CRASH_ADVICE',
  },
};

/**
 * Any configuration error code.
 *
 * @public
 */
export type ConfigurationErrorCode =
  keyof ErrorCodeDefinitions['configuration'];
