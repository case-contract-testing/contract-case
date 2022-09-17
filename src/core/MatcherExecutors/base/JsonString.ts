import type { JsonStringMatcher } from 'dsl/Matchers/types';
import { makeMatchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';

export const JsonString = (
  matcher: JsonStringMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (typeof actual !== 'string') {
    return [
      makeMatchingError(matcher, `'${typeof actual}' is not a string`, actual),
    ];
  }
  return [];
};
