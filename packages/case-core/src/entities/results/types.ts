import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import type { CaseExample } from '../../entities/contract/types';
import type { VerifyTriggerReturnObjectError } from '../../entities/errors';
import type { DataContext } from '../../entities/types';

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
 * Represents an error because of configuration during test execution
 */
export const ERROR_TYPE_CONFIGURATION = 'CONFIGURATION_ERROR' as const;

/**
 * Represents an error because of the user supplied trigger
 */
export const ERROR_TYPE_TRIGGER = 'TRIGGER_FUNCTION_ERROR' as const;

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

export interface ConfigurationError {
  type: typeof ERROR_TYPE_CONFIGURATION;
  message: string;
  code: string;
  location: Array<string>;
  toString: () => string;
}

export interface TriggerError {
  type: typeof ERROR_TYPE_TRIGGER;
  message: string;
  code: string;
  location: Array<string>;
  toString: () => string;
}

export type CaseError =
  | MatchingError
  | ConfigurationError
  | TriggerError
  | VerificationError
  | RawMatchError;

export type MatchResult = Array<CaseError>;

export type ResultFormatter = {
  printError: (e: CaseError, context: DataContext) => void;
  printSuccessTitle: (
    example: CaseExample,
    index: string,
    context: DataContext
  ) => void;
  printFailureTitle: (
    example: CaseExample,
    index: string,
    context: DataContext
  ) => void;
  printDownloadedContract: (filename: string, context: DataContext) => void;
};
