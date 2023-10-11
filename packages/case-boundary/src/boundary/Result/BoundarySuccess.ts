import { RESULT_SUCCESS } from './BoundaryResultTypeConstants';
import { BoundaryResult } from './BoundaryResult';

/**
 * This indicates that the result was successful
 *
 * @public
 */
export class BoundarySuccess extends BoundaryResult {
  readonly resultType: typeof RESULT_SUCCESS;

  constructor() {
    super(RESULT_SUCCESS);
    this.resultType = RESULT_SUCCESS;
  }
}
