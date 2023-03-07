import type { MatchResult } from '../../entities/types';

export class CaseFailedAssertionError extends Error {
  matchResult: MatchResult;

  constructor(matchResult: MatchResult) {
    super(
      `Case example failed to match the expectations: \n\n${matchResult.map(
        (r) => `${r.message}\n`
      )}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseFailedAssertionError.name;
    this.matchResult = matchResult;
  }
}
