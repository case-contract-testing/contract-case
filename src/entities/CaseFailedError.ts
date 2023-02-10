import type { MatchResult } from './types';

export class CaseFailedError extends Error {
  matchResult: MatchResult;

  constructor(matchResult: MatchResult) {
    super(
      `Contract test failed: \n\n${matchResult.map((r) => `${r.message}\n`)}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseFailedError.name;
    this.matchResult = matchResult;
  }
}
