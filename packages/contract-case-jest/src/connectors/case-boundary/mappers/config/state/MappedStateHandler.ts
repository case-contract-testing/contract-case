import {
  BoundaryResult,
  BoundarySuccessWithMap,
  BoundarySuccess,
  BoundaryStateHandler,
} from '@contract-case/case-connector/cjs';
import {
  SetupFunction,
  TeardownFunction,
} from '../../../../../entities/types.js';
import { makeBoundaryFailure } from '../../jsErrorToBoundary.js';

export class MappedStateHandler extends BoundaryStateHandler {
  private setupFn: SetupFunction;

  private teardownFn: TeardownFunction;

  constructor(setupFn: SetupFunction, teardownFn: TeardownFunction) {
    super();
    this.setupFn = setupFn;
    this.teardownFn = teardownFn;
  }

  override setup(): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => this.setupFn())
      .then((contents) => {
        if (contents != null) {
          return new BoundarySuccessWithMap(contents);
        }
        return new BoundarySuccess();
      })
      .catch(makeBoundaryFailure);
  }

  override teardown(): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => this.teardownFn())
      .then(() => new BoundarySuccess())
      .catch(makeBoundaryFailure);
  }
}
