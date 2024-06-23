import { locationString } from '../../context';
import { MatchContext } from '../../context/types';
import { CaseError, ERROR_TYPE_MATCHING, MatchResult } from '../errors.types';
import { AnyCaseMatcher } from '../matchers.types';

/**
 * Helper function that will return an error if the test condition is met, or a non-erroring {@link MatchResult} otherwise.
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
 * @param expected - An optional expected value (might be a description of what was expected)
 * @returns CaseError
 */
export const matchingError = (
  matcher: AnyCaseMatcher,
  message: string,
  actual: unknown,
  context: MatchContext,
  expected?: unknown,
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
