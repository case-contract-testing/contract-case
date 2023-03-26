import type { CaseExample } from '../../entities/contract/types';
import type { VerifyTriggerReturnObjectError } from '../../entities/errors';
import type { AnyCaseMatcher, MatchContext } from '../../entities/types';

// Warning: **ALL** error types must be listed in the function in handlers.ts

/**
 * Represents an error from a matcher
 */
export const ERROR_TYPE_MATCHING = 'MATCHING_ERROR' as const;
/**
 * Represents an error that would be from a matcher, but there's no physical matcher
 */
export const ERROR_TYPE_RAW_MATCH = 'RAW_MATCH_ERROR' as const;

/**
 * Represents an error executing the test (usually the trigger function)
 */
export const ERROR_TYPE_EXECUTION = 'EXECUTION_ERROR' as const;

/**
 * Represents an error during the testResponse or testErrorResponse function
 */
export const ERROR_TYPE_TEST_RESPONSE = 'TEST_RESPONSE_ERROR' as const;

export interface MatchingError {
  type: typeof ERROR_TYPE_MATCHING;
  message: string;
  expected: unknown;
  matcher: AnyCaseMatcher;
  actual: unknown;
  location: Array<string>;
  toString: () => string;
}

export interface RawMatchError {
  type: typeof ERROR_TYPE_RAW_MATCH;
  message: string;
  expected: unknown;
  code: string;
  actual: unknown;
  location: Array<string>;
  toString: () => string;
}

export interface VerificationError {
  type: typeof ERROR_TYPE_TEST_RESPONSE;
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

export type CaseError =
  | MatchingError
  | ExecutionError
  | VerificationError
  | RawMatchError;

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
