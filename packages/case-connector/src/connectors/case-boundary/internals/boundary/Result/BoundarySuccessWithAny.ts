import { BoundaryResult } from './BoundaryResult.js';
import { RESULT_SUCCESS_HAS_ANY_PAYLOAD } from './BoundaryResultTypeConstants.js';

/**
 * This indicates a success with any arbitrary payload
 *
 * The payload must be a JSON encoded string.
 *
 * @public
 */
export class BoundarySuccessWithAny extends BoundaryResult {
  override readonly resultType: typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD;

  readonly payload: string;

  constructor(payload: string) {
    super(RESULT_SUCCESS_HAS_ANY_PAYLOAD);
    this.resultType = RESULT_SUCCESS_HAS_ANY_PAYLOAD;
    this.payload = payload;
  }
}
