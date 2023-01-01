import type { CaseExample } from 'entities/contract/types';
import type { AnyCaseMatcher } from 'entities/types';

export interface MatchingError {
  message: string;
  expected: unknown;
  matcher: AnyCaseMatcher;
  actual: unknown;
  location: Array<string>;
  toString: () => string;
}

export type MatchResult = Array<MatchingError>;

export type ResultPrinter = {
  printError: (e: MatchingError) => void;
  printSuccessTitle: (example: CaseExample, index: number) => void;
  printFailureTitle: (example: CaseExample, index: number) => void;
};
