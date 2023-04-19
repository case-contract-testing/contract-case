import { Result, RESULT_SUCCESS } from './Result';

export class Success extends Result {
  /** @internal */
  readonly _result: typeof RESULT_SUCCESS;

  constructor() {
    super(RESULT_SUCCESS);
    this._result = RESULT_SUCCESS;
  }
}
