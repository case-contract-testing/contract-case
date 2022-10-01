export interface MatchingError {
  message: string;
  expected: unknown;
  actual: unknown;
  toString: () => string;
}

export type MatchResult = Array<MatchingError>;
