import type { MatchResult } from '../../entities/types';

export class CaseFailedAssertionError extends Error {
  matchResult: MatchResult;

  constructor(matchResult: MatchResult) {
    super(
      `Contract test failed: \n\n${matchResult.map((r) => `${r.message}\n`)}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseFailedAssertionError.name;
    this.matchResult = matchResult;
  }
}
