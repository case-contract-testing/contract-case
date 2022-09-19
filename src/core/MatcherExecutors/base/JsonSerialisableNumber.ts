import type { JsonNumberMatcher } from 'dsl/Matchers/types';
import { makeMatchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';

export const JsonSerialiableNumber = (
  matcher: JsonNumberMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (typeof actual !== 'number') {
    return [
      makeMatchingError(matcher, `'${typeof actual}' is not a number`, actual),
    ];
  }
  if (Number.isNaN(actual)) {
    return [
      makeMatchingError(matcher, 'NaN is not a valid JSON number', actual),
    ];
  }
  if (!Number.isFinite(actual)) {
    return [makeMatchingError(matcher, 'JSON numbers must be finite', actual)];
  }
  return [];
};
