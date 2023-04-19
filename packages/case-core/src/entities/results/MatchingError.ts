import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import { locationString } from '../../entities/context';
import type { MatchContext } from '../../entities/context/types';
import type { VerifyTriggerReturnObjectError } from '../../entities/errors';
import {
  ERROR_TYPE_MATCHING,
  CaseError,
  ExecutionError,
  ERROR_TYPE_EXECUTION,
  ERROR_TYPE_TEST_RESPONSE,
  VerificationError,
  ERROR_TYPE_RAW_MATCH,
} from './types';

export const errorWhen = (
  test: boolean,
  err: CaseError | Array<CaseError>
): Array<CaseError> => (test ? [err].flat() : []);

/**
 * This represents a mismatched matcher
 *
 * @param matcher - The matcher that generated this error
 * @param message - The message that describes this error
 * @param actual - The actual value that was recieved
 * @param context - The match context this occurred in
 * @param expected - An optional expected value (might be a description of what was expected)
 * @returns CaseError
 */
export const matchingError = (
  matcher: AnyCaseMatcher,
  message: string,
  actual: unknown,
  context: MatchContext,
  expected?: unknown
): CaseError => ({
  type: ERROR_TYPE_MATCHING,
  matcher,
  message,
  expected:
    expected ||
    ('_case:matcher:example' in matcher
      ? matcher['_case:matcher:example']
      : context.descendAndStrip(matcher, context)),
  actual,
  location: context['_case:currentRun:context:location'],
  toString: () =>
    `${locationString(context)}: ${message} (${matcher['_case:matcher:type']})`,
});

/**
 * This represents a mismatch during a case execution that isn't covered by a
 * matcher (usually this is a misconfiguration that is not well described by a
 * {@link ../../entities/errors#CaseConfigurationError | CaseConfigurationError})
 *
 * @param message - The message that describes this error
 * @param actual - The actual value that was recieved
 * @param code - A code that can be looked up in the documentation
 * @param context - The match context this occurred in
 * @param expected - An optional expected value (might be a description of what was expected)
 * @returns CaseError
 */
export const failedExpectationError = (
  message: string,
  actual: unknown,
  code: string,
  context: MatchContext,
  expected: unknown
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
 * This represents an error thrown by user code during execution of an example
 * (eg, when a user's trigger is called)
 *
 * @param error - The error thrown
 * @param context - the context that the error was in
 * @returns ExecutionError
 */
export const executionError = (
  error: Error,
  context: MatchContext
): ExecutionError => ({
  type: ERROR_TYPE_EXECUTION,
  message: error.message,
  code: error.name,
  location: context['_case:currentRun:context:location'],
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
  context: MatchContext
): VerificationError => ({
  type: ERROR_TYPE_TEST_RESPONSE,
  message: error.message,
  code: error.name,
  error,
  location: context['_case:currentRun:context:location'],
});
