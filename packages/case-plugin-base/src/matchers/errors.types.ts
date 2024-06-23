import { VerifyTriggerReturnObjectError } from '../errors/VerifyTriggerReturnObjectError';
import { AnyCaseMatcher } from './matchers.types';

// ************************************************************
// Warning: **ALL** of the following error types must be listed
// in the function in the core's handlers.ts
//
// DO NOT MODIFY THIS FILE WITHOUT ALSO MODIFYING
//     handlers.ts in CaseCore
// ************************************************************

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

/**
 * Describes the data of an error encountered during a matcher execution. Don't
 * create these manually, use `matchingError` to create them.
 *
 * @privateRemarks
 *
 * TODO: link `matchingError` in this documentation when tsdoc supports better imports
 */
export interface MatchingError {
  type: typeof ERROR_TYPE_MATCHING;
  /**
   * A human readable message for this error
   */
  message: string;
  /**
   * What data was expected (could be an english description, or the raw expected data. Prefer raw data if possible)
   */
  expected: unknown;
  /**
   * The matcher descriptor that emitted this error
   */
  matcher: AnyCaseMatcher;
  /**
   * The actual data that was encountered (could be an english description, or the raw expected data. Prefer raw data if possible)
   */
  actual: unknown;
  /**
   * The ContractCase run location array
   */
  location: Array<string>;
  /**
   * A helper to make it easy to print these errors during debugging
   *
   * @returns A combination of the location and error messages.
   */
  toString: () => string;
}

/**
 * Describes the data of an error encountered during an execution, where an
 * expectation of a mock couldn't be met (eg, expected a call when we didn't get
 * one)
 *
 * Don't create these manually, use `failedExpectationError` to create them.
 *
 * @privateRemarks
 * TODO: link `failedExpectationError` in this documentation when tsdoc supports better imports
 */
export interface RawMatchError {
  type: typeof ERROR_TYPE_RAW_MATCH;
  /**
   * A human readable message for this error
   */
  message: string;
  /**
   * What we expected to happen (in most cases this will be an English string that describes the situation)
   */
  expected: unknown;
  /**
   * The error code that is associated with this raw match.
   * This should be a unique code specific to this kind of error that users
   * could look up in the documentation for more information.
   */
  code: string;
  /**
   * What actually happened (in most cases this will be an English string that describes the situation)
   */
  actual: unknown;
  /**
   * The ContractCase run location array
   */
  location: Array<string>;
  toString: () => string;
}

/**
 * The data for an error during a testResponse or testErrorResponse function.
 *
 * You shouldn't need to use this in most plugins, as the core will call it for you.
 *
 * Don't create this directly, use `verificationError` to create one.
 */
export interface VerificationError {
  type: typeof ERROR_TYPE_TEST_RESPONSE;
  message: string;
  /**
   * The error code that is associated with this verification error
   * This should be a unique code specific to this kind of error that users
   * could look up in the documentation for more information.
   */
  code: string;
  error: VerifyTriggerReturnObjectError;
  location: Array<string>;
  toString: () => string;
}

/**
 * The data for a user configuration error.
 *
 * Don't create this directly, use `configurationError` to create one.
 */
export interface ConfigurationError {
  type: typeof ERROR_TYPE_CONFIGURATION;
  message: string;
  /**
   * The error code that is associated with this configuration error
   * This should be a unique code specific to this kind of error that users
   * could look up in the documentation for more information.
   */
  code: string;
  location: Array<string>;
  toString: () => string;
}

/**
 * The data for an error during execution of a trigger function
 *
 * You shouldn't need to use this in most plugins, as the core will call it for you when necessary
 *
 * Don't create this directly, use `triggerError` to create one.
 */
export interface TriggerError {
  type: typeof ERROR_TYPE_TRIGGER;
  message: string;
  code: string;
  location: Array<string>;
  toString: () => string;
}

/**
 * Union of all error data types.
 */
export type CaseError =
  | MatchingError
  | ConfigurationError
  | TriggerError
  | VerificationError
  | RawMatchError;

/**
 * Describes the result of calling a matcher executor. If there are no errors, the array should be empty.
 */
export type MatchResult = Array<CaseError>;
