import type { CaseExample } from 'entities/contract/types';
import type { VerifyTriggerReturnObjectError } from 'entities/errors';
import type { AnyCaseMatcher, MatchContext } from 'entities/types';

export const ERROR_TYPE_MATCHING = 'MATCHING_ERROR' as const;
export const ERROR_TYPE_EXECUTION = 'EXECUTION_ERROR' as const;
export const ERROR_TYPE_VERIFICATION = 'VERIFICATION_ERROR' as const;

export interface MatchingError {
  type: typeof ERROR_TYPE_MATCHING;
  message: string;
  expected: unknown;
  matcher: AnyCaseMatcher;
  actual: unknown;
  location: Array<string>;
  toString: () => string;
}

export interface VerificationError {
  type: typeof ERROR_TYPE_VERIFICATION;
  message: string;
  code: string;
  error: VerifyTriggerReturnObjectError;
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

export type CaseError = MatchingError | ExecutionError | VerificationError;

export type MatchResult = Array<CaseError>;

export type ResultPrinter = {
  printError: (e: CaseError, context: MatchContext) => void;
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
