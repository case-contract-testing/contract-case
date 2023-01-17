import type { CaseExample } from 'entities/contract/types';
import type { AnyCaseMatcher, MatchContext } from 'entities/types';

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
  printError: (e: MatchingError, context: MatchContext) => void;
  printSuccessTitle: (
    example: CaseExample,
    index: string,
    context: MatchContext
  ) => void;
  printFailureTitle: (
    example: CaseExample,
    index: string,
    context: MatchContext
  ) => void;
};
