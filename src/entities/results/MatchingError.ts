import { locationString } from 'entities/context';
import type { MatchContext } from 'entities/context/types';
import type { AnyCaseMatcher } from 'entities/nodes/matchers/types';
import type { MatchingError } from './types';

export const errorWhen = (
  test: boolean,
  err: MatchingError | Array<MatchingError>
): Array<MatchingError> => (test ? [err].flat() : []);

/**
 *
 * @param matcher The matcher that generated this error
 * @param message
 * @param actual
 * @returns
 */
export const matchingError = (
  matcher: AnyCaseMatcher,
  message: string,
  actual: unknown,
  context: MatchContext
): MatchingError => ({
  message,
  expected:
    'case:matcher:example' in matcher ? matcher['case:matcher:example'] : null,
  actual,
  location: context['case:currentRun:context:location'],
  toString: () =>
    `${locationString(context)}: ${message} (${matcher['case:matcher:type']})`,
});
