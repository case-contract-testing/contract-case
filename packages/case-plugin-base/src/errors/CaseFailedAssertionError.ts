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
      `Contract test interaction didn't match the expectation: \n\n${matchResult
        .map((r) => `   - ${r.message}`)
        .reduce((acc, curr) => `${acc}\n${curr}`)}`,
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseFailedAssertionError';
    this.matchResult = matchResult;
  }
}
