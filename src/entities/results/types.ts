export interface MatchingError {
  message: string;
  expected: unknown;
  actual: unknown;
  location: Array<string>;
  toString: () => string;
}

export type MatchResult = Array<MatchingError>;
