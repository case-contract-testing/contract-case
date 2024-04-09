/**
 * This is a success type with no payload
 * @internal
 */
export const RESULT_SUCCESS = 'Success';
/**
 * This is a success type with a map payload
 * @internal
 */
export const RESULT_SUCCESS_HAS_MAP_PAYLOAD = 'SuccessMap';
/**
 * This is a success type with an arbitrary object payload
 * @internal
 */
export const RESULT_SUCCESS_HAS_ANY_PAYLOAD = 'SuccessAny';
/**
 * This is a failure
 * @internal
 */
export const RESULT_FAILURE = 'Failure';

/**
 * Use these constants to determine what type of result a BoundaryResult is.
 * @public
 */
export class BoundaryResultTypeConstants {
  /** This is a success type with no payload */
  static readonly RESULT_SUCCESS = RESULT_SUCCESS;

  /** This is a success type with a map payload */
  static readonly RESULT_SUCCESS_HAS_MAP_PAYLOAD =
    RESULT_SUCCESS_HAS_MAP_PAYLOAD;

  /** This is a success type with an arbitrary object payload */
  static readonly RESULT_SUCCESS_HAS_ANY_PAYLOAD =
    RESULT_SUCCESS_HAS_ANY_PAYLOAD;

  /** This is a failure */
  static readonly RESULT_FAILURE = RESULT_FAILURE;
}
