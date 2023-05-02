export const RESULT_SUCCESS = 'Success';
export const RESULT_SUCCESS_HAS_MAP_PAYLOAD = 'SuccessMap';
export const RESULT_SUCCESS_HAS_ANY_PAYLOAD = 'SuccessAny';
export const RESULT_FAILURE = 'Failure';

type BoundaryResultType =
  | typeof RESULT_SUCCESS
  | typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD
  | typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD
  | typeof RESULT_FAILURE;

export class ResultTypeConstants {
  static readonly RESULT_SUCCESS = RESULT_SUCCESS;

  static readonly RESULT_SUCCESS_HAS_MAP_PAYLOAD =
    RESULT_SUCCESS_HAS_MAP_PAYLOAD;

  static readonly RESULT_SUCCESS_HAS_ANY_PAYLOAD =
    RESULT_SUCCESS_HAS_ANY_PAYLOAD;

  static readonly RESULT_FAILURE = RESULT_FAILURE;
}

/** Supertype for all methods that return results */
export abstract class BoundaryResult {
  /* One of the constants from ResultTypeConstants indicating what the type of
   * this result is */
  readonly resultType: BoundaryResultType;

  constructor(result: BoundaryResultType) {
    this.resultType = result;
  }
}
