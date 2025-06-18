import type { MatchResult } from '../matchers/errors.types';

/**
 * This is thrown by ContractCase core when expectations set up in the test were not met.
 *
 * If implementing a plugin, do not throw this during a matcher execution,
 * instead return a {@link MatchResult} that contains the appropriate error.
 *
 * @public
 */
export class CaseFailedAssertionError extends Error {
  matchResult: MatchResult;

  constructor(matchResult: MatchResult) {
    super(
      `Test interaction didn't match the definition${matchResult.length > 1 ? 's' : ''}:\n\n${matchResult
        .map((r) => `   - ${r.message.replaceAll('\n', '\n     ')}`)
        .reduce((acc, curr) => `${acc}\n${curr}\n`, '')}`,
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseFailedAssertionError';
    this.matchResult = matchResult;
  }
}
