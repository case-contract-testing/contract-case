import type { CaseMatcherWithExample } from 'entities/nodes/matchers/types';
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
  matcher: CaseMatcherWithExample,
  message: string,
  actual: unknown
): MatchingError => ({
  message,
  expected: matcher['case:matcher:example'],
  actual,
  toString: () => `[${matcher['case:matcher:type']}] ${message}: '${actual}'`,
});
