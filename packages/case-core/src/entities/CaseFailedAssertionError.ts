import { MatchResult } from '@contract-case/case-plugin-base';

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

  constructor(errorMessage: string, matchResult: MatchResult) {
    super(`Actual interaction didn't match the definition\n${errorMessage}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseFailedAssertionError';
    this.matchResult = matchResult;
  }
}
