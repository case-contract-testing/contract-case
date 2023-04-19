export const RESULT_SUCCESS = 'Success';
export const RESULT_SUCCESS_HAS_MAP_PAYLOAD = 'SuccessMap';
export const RESULT_SUCCESS_HAS_ANY_PAYLOAD = 'SuccessAny';
export const RESULT_FAILURE = 'Failure';

type ResultType =
  | typeof RESULT_SUCCESS
  | typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD
  | typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD
  | typeof RESULT_FAILURE;

/** Supertype for all methods that return results */
export abstract class Result {
  /** @internal */
  readonly _result: ResultType;

  constructor(result: ResultType) {
    this._result = result;
  }
}
