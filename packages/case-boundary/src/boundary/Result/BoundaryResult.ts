import {
  RESULT_SUCCESS,
  RESULT_SUCCESS_HAS_MAP_PAYLOAD,
  RESULT_SUCCESS_HAS_ANY_PAYLOAD,
  RESULT_FAILURE,
} from './BoundaryResultTypeConstants';

type BoundaryResultType =
  | typeof RESULT_SUCCESS
  | typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD
  | typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD
  | typeof RESULT_FAILURE;

/** Supertype for all methods that return results */
export abstract class BoundaryResult {
  /* One of the constants from ResultTypeConstants indicating what the type of
   * this result is */
  readonly resultType: BoundaryResultType;

  constructor(result: BoundaryResultType) {
    this.resultType = result;
  }
}
