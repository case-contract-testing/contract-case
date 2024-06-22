import { BoundaryResult } from './BoundaryResult.js';
import { RESULT_FAILURE } from './BoundaryResultTypeConstants.js';

/**
 * This indicates a failure. Use `BoundaryFailureKindConstants` to determine what type of failure it is.
 *
 * @public
 */
export class BoundaryFailure extends BoundaryResult {
  override readonly resultType: typeof RESULT_FAILURE;

  readonly kind: string;

  readonly message: string;

  readonly location: string;

  constructor(kind: string, message: string, location: string) {
    super(RESULT_FAILURE);
    this.resultType = RESULT_FAILURE;
    this.kind = kind;
    this.message = message;
    this.location = location;
  }
}
