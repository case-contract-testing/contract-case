import { BoundaryResult, RESULT_SUCCESS } from './BoundaryResult';

export class BoundarySuccess extends BoundaryResult {
  /** @internal */
  readonly _result: typeof RESULT_SUCCESS;

  constructor() {
    super(RESULT_SUCCESS);
    this._result = RESULT_SUCCESS;
  }
}
