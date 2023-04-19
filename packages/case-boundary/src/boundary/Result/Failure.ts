import { RESULT_FAILURE, Result } from './Result';

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
