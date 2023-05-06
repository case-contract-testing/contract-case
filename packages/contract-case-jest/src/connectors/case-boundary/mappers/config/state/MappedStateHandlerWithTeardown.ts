import {
  BoundaryStateHandlerWithTeardown,
  BoundaryResult,
  BoundarySuccessWithMap,
  BoundarySuccess,
} from '@contract-case/case-boundary';
import { SetupFunction, TeardownFunction } from '../../../../../entities/types';
import { makeBoundaryFailure } from '../../jsErrorToBoundary';

export class MappedStateHandlerWithTeardown extends BoundaryStateHandlerWithTeardown {
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
