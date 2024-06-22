import { RESULT_SUCCESS } from './BoundaryResultTypeConstants.js';
import { BoundaryResult } from './BoundaryResult.js';

/**
 * This indicates that the result was successful
 *
 * @public
 */
export class BoundarySuccess extends BoundaryResult {
  override readonly resultType: typeof RESULT_SUCCESS;

  constructor() {
    super(RESULT_SUCCESS);
    this.resultType = RESULT_SUCCESS;
  }
}
