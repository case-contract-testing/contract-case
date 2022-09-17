import type { AnyMatcher } from 'dsl/Matchers/types';
import type { MatchingError } from './types';

/**
 *
 * @param matcher The matcher that generated this error
 * @param message
 * @param actual
 * @returns
 */
export const makeMatchingError = (
  matcher: AnyMatcher,
  message: string,
  actual: unknown
): MatchingError => ({
  message,
  expected: matcher['case:matcher:example'],
  actual,
  toString: () => `[${matcher['case:matcher:type']}] ${message}: '${actual}'`,
});
