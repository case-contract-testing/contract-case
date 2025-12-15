import {
  MatchContext,
  ConfigurationError,
  ERROR_TYPE_CONFIGURATION,
  CaseTriggerError,
  TriggerError,
  ERROR_TYPE_TRIGGER,
  VerifyTriggerReturnObjectError,
  VerificationError,
  ERROR_TYPE_TEST_RESPONSE,
  ConfigurationErrorCode,
} from '@contract-case/case-plugin-base';

const renderUserFacingStacktrace = (error: unknown) => {
  if (
    error != null &&
    typeof error === 'object' &&
    'userFacingStackTrace' in error
  ) {
    return `\n\n${error.userFacingStackTrace}`;
  }
  return '';
};

/**
 * This represents an error during execution of an example due to user configuration.
 *
 * @param error - The error thrown
 * @param context - the context that the error was in
 * @returns ExecutionError
 */
export const configurationError = (
  error: Error & { contractCaseErrorCode?: ConfigurationErrorCode },
  context: MatchContext,
): ConfigurationError => ({
  type: ERROR_TYPE_CONFIGURATION,
  message: error.message,
  code: error?.contractCaseErrorCode
    ? error.contractCaseErrorCode
    : 'UNDOCUMENTED',
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
  message: `${error.message}${renderUserFacingStacktrace(error)}`,
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
  message: `${error.message}${renderUserFacingStacktrace(error)}`,
  code: error.name,
  error,
  location: context['_case:currentRun:context:location'],
});
