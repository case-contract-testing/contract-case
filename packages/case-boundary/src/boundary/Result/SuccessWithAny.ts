import { Result, RESULT_SUCCESS_HAS_ANY_PAYLOAD } from './Result';

export class SuccessWithAny extends Result {
  /** @internal */
  readonly _result: typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD;

  readonly payload: unknown;

  constructor(payload: unknown) {
    super(RESULT_SUCCESS_HAS_ANY_PAYLOAD);
    this._result = RESULT_SUCCESS_HAS_ANY_PAYLOAD;
    this.payload = payload;
  }
}
