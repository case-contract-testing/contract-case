import { RESULT_FAILURE, BoundaryResult } from './BoundaryResult';

export class BoundaryFailure extends BoundaryResult {
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
