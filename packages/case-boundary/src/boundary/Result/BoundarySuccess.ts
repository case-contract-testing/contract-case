import { BoundaryResult, RESULT_SUCCESS } from './BoundaryResult';

export class BoundarySuccess extends BoundaryResult {
  readonly resultType: typeof RESULT_SUCCESS;

  constructor() {
    super(RESULT_SUCCESS);
    this.resultType = RESULT_SUCCESS;
  }
}
