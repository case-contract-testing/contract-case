import { BoundaryResult } from './BoundaryResult';
import { RESULT_SUCCESS_HAS_ANY_PAYLOAD } from './BoundaryResultTypeConstants';

export class BoundarySuccessWithAny extends BoundaryResult {
  readonly resultType: typeof RESULT_SUCCESS_HAS_ANY_PAYLOAD;

  readonly payload: unknown;

  constructor(payload: unknown) {
    super(RESULT_SUCCESS_HAS_ANY_PAYLOAD);
    this.resultType = RESULT_SUCCESS_HAS_ANY_PAYLOAD;
    this.payload = payload;
  }
}
