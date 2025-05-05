import {
  MatchContext,
  CaseError,
  ERROR_TYPE_RAW_MATCH,
  locationString,
  ConfigurationError,
  ERROR_TYPE_CONFIGURATION,
  CaseTriggerError,
  TriggerError,
  ERROR_TYPE_TRIGGER,
  VerifyTriggerReturnObjectError,
  VerificationError,
  ERROR_TYPE_TEST_RESPONSE,
} from '@contract-case/case-plugin-base';

/**
 * This represents a mismatch during a case execution that isn't covered by a
 * matcher (usually this is a misconfiguration that is not well described by a
 * {@link ../../entities/errors#CaseConfigurationError | CaseConfigurationError})
 *
 * @param message - The message that describes this error
 * @param actual - The actual value that was recieved
 * @param code - A code that can be looked up in the documentation. This should
 *                be a unique code specific to this kind of error that users
 *                could look up in the documentation for more information.
 * @param context - The match context this occurred in
 * @param expected - An optional expected value (might be a description of what was expected)
 * @returns CaseError
 */
export const failedExpectationError = (
  message: string,
  actual: unknown,
  code: string,
  context: MatchContext,
  expected: unknown,
): CaseError => ({
  type: ERROR_TYPE_RAW_MATCH,
  message,
  expected,
  actual,
  code,
  location: context['_case:currentRun:context:location'],
  toString: () => `${locationString(context)}: ${message}`,
});

/**
 * This represents an error during execution of an example due to user configuration.
 *
 * @param error - The error thrown
 * @param context - the context that the error was in
 * @returns ExecutionError
 */
export const configurationError = (
  error: Error,
  context: MatchContext,
): ConfigurationError => ({
  type: ERROR_TYPE_CONFIGURATION,
  message: error.message,
  code: 'ConfigurationError',
  location: context['_case:currentRun:context:location'],
});

/**
 * This represents an error thrown by user code during execution of an example
 * (eg, when a user's trigger is called)
 * @param error - The error thrown
 * @param context - the context that the error was in
 * @returns ExecutionError
 */
export const triggerError = (
  error: CaseTriggerError,
  context: MatchContext,
): TriggerError => ({
  type: ERROR_TYPE_TRIGGER,
  message: error.message,
  code: 'TriggerFunctionError',
  location: context['_case:currentRun:context:location'],
  userFacingStackTrace: error.userFacingStackTrace,
});

/**
 * This represents an error thrown during verification using the provided
 * verification function
 *
 * @param error - The VerifyTriggerReturnObjectError from the verification
 * @param context - the context that the error was in
 * @returns VerificationError
 */
export const verificationError = (
  error: VerifyTriggerReturnObjectError,
  context: MatchContext,
): VerificationError => ({
  type: ERROR_TYPE_TEST_RESPONSE,
  message: error.message,
  code: error.name,
  error,
  location: context['_case:currentRun:context:location'],
});
