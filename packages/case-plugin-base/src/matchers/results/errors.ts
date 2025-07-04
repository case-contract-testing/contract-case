import { AnyCaseMatcher } from '@contract-case/case-plugin-dsl-types';
import { locationString } from '../../context';
import { MatchContext } from '../../context/types';
import {
  CaseError,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_RAW_MATCH,
  ErrorAnnotations,
  MatchResult,
} from '../errors.types';

/**
 * Helper function that will return a {@link CaseError} if the test condition is met, or a non-erroring {@link MatchResult} otherwise.
 *
 * @public
 * @param test - a boolean condition
 * @param err - either an error or an array of errors
 * @returns a {@link MatchResult} containing the errors if `test` is true, or a passing {@link MatchResult} otherwise.
 */
export const errorWhen = (
  test: boolean,
  err: CaseError | Array<CaseError>,
): MatchResult => (test ? [err].flat() : []);

/**
 * Creates a mismatched matcher expectations error
 *
 * @public
 *
 * @param matcher - The matcher that generated this error
 * @param message - The message that describes this error
 * @param actual - The actual value that was received
 * @param context - The match context this occurred in
 * @param expected - An optional expected value. If this is not provided or is `undefined`, it is calculated using `descendAndStrip`
 * @param annotations - Optional annotations to provide additional information for the user about the values printed
 * @returns CaseError
 */
export const matchingError = (
  matcher: AnyCaseMatcher,
  message: string,
  actual: unknown,
  context: MatchContext,
  expected?: unknown,
  annotations?: ErrorAnnotations,
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
  ...(annotations != null ? { annotations } : {}),
});

/**
 * This represents a mismatch during a case execution that isn't covered by a
 * matcher (usually this is an expectation failure during a MockInteraction which
 * means we can't run the matching engine for some reason).
 *
 * Most of the time you won't need to use this, because most matching errors
 * come from matchers. Errors encountered during matcher execution should use
 * {@link matchingError} instead.
 *
 * @public
 *
 *
 * @param message - The message that describes this error
 * @param actual - The actual value that was received
 * @param code - A code that can be looked up in the documentation. This should
 *                be a unique code specific to this kind of error that users
 *                could look up in the documentation for more information.
 * @param context - The match context this occurred in
 * @param expected - An optional expected value (might be a description of what was expected)
 * @param annotations - Optional annotations to provide additional information for the user about the values printed
 * @returns CaseError
 */
export const failedExpectationError = (
  message: string,
  actual: unknown,
  code: string,
  context: MatchContext,
  expected: unknown,
  annotations?: ErrorAnnotations,
): CaseError => ({
  type: ERROR_TYPE_RAW_MATCH,
  message,
  expected,
  actual,
  code,
  location: context['_case:currentRun:context:location'],
  toString: () => `${locationString(context)}: ${message}`,
  ...(annotations != null ? { annotations } : {}),
});
