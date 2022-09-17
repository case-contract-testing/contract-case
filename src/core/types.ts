export interface MatchingError {
  message: string;
  expected: unknown;
  actual: unknown;
  toString: () => string;
}
