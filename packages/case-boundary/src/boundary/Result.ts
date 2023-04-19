/** Supertype for all methods that return results */
export abstract class Result {
  /** @internal */
  readonly _result: ResultType;

  constructor(result: ResultType) {
    this._result = result;
  }
}

export const RESULT_SUCCESS = 'Success';
export const RESULT_SUCCESS_HAS_MAP_PAYLOAD = 'SuccessMap';
export const RESULT_FAILURE = 'Failure';

type ResultType =
  | typeof RESULT_SUCCESS
  | typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD
  | typeof RESULT_FAILURE;

export class Success extends Result {
  /** @internal */
  readonly _result: typeof RESULT_SUCCESS;

  constructor() {
    super(RESULT_SUCCESS);
    this._result = RESULT_SUCCESS;
  }
}

export class SuccessWithMap extends Result {
  /** @internal */
  readonly _result: typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD;

  readonly payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    super(RESULT_SUCCESS_HAS_MAP_PAYLOAD);
    this._result = RESULT_SUCCESS_HAS_MAP_PAYLOAD;
    this.payload = payload;
  }
}

export class Failure extends Result {
  /** @internal */
  readonly _result: typeof RESULT_FAILURE;

  readonly kind: string;

  readonly message: string;

  readonly location: string;

  constructor(kind: string, message: string, location: string) {
    super(RESULT_FAILURE);
    this._result = RESULT_FAILURE;
    this.kind = kind;
    this.message = message;
    this.location = location;
  }
}
