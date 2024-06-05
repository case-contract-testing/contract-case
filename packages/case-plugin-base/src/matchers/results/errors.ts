import { locationString } from '../../context';
import { MatchContext } from '../../context/types';
import { CaseError, ERROR_TYPE_MATCHING } from '../errors.types';
import { AnyCaseMatcher } from '../matchers.types';

export const errorWhen = (
  test: boolean,
  err: CaseError | Array<CaseError>,
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
