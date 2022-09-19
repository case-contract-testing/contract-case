import { makeMatchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import type { JsonBooleanMatcher } from 'dsl/Matchers/types';

export const JsonSerialiableBoolean = (
  matcher: JsonBooleanMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (typeof actual !== 'boolean') {
    return [makeMatchingError(matcher, `'${actual}' is not a boolean`, actual)];
  }
  return [];
};
