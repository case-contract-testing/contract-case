import { Result, RESULT_SUCCESS_HAS_MAP_PAYLOAD } from './Result';

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
