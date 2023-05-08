import type { MatchResult } from '../../entities/types';

/**
 * Use this when expectations set up in the test were not met
 */
export class CaseFailedAssertionError extends Error {
  matchResult: MatchResult;

  constructor(matchResult: MatchResult) {
    super(
      `ContractCase example failed to match the expectations: \n\n${matchResult
        .map((r) => `${r.message}`)
        .reduce((acc, curr) => `${acc}\n${curr}`)}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseFailedAssertionError.name;
    this.matchResult = matchResult;
  }
}
