import type { CaseExample } from 'entities/contract/types';
import type { AnyCaseMatcher, MatchContext } from 'entities/types';

export const ERROR_TYPE_MATCHING = 'MATCHING_ERROR' as const;
export const ERROR_TYPE_EXECUTION = 'EXECUTION_ERROR' as const;

export interface MatchingError {
  type: typeof ERROR_TYPE_MATCHING;
  message: string;
  expected: unknown;
  matcher: AnyCaseMatcher;
  actual: unknown;
  location: Array<string>;
  toString: () => string;
}

export interface ExecutionError {
  type: typeof ERROR_TYPE_EXECUTION;
  message: string;
  code: string;
  location: Array<string>;
  toString: () => string;
}

export type CaseError = MatchingError | ExecutionError;

export type MatchResult = Array<CaseError | ExecutionError>;

export type ResultPrinter = {
  printError: (e: CaseError | ExecutionError, context: MatchContext) => void;
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
