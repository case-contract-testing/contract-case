import {
  BoundaryStateHandler,
  BoundaryResult,
  BoundarySuccess,
  BoundarySuccessWithMap,
} from '@contract-case/case-boundary';
import { SetupFunction } from '../../../entities/types';
import { makeBoundaryFailure } from './jsErrorToBoundary';

export class MappedStateHandler extends BoundaryStateHandler {
  private setupFn: SetupFunction;

  constructor(setupFn: SetupFunction) {
    super();
    this.setupFn = setupFn;
  }

  override setup(): Promise<BoundaryResult> {
    return Promise.resolve()
      .then(() => this.setupFn())
      .then((contents) => {
        if (contents) {
          return new BoundarySuccessWithMap(contents);
        }
        return new BoundarySuccess();
      })
      .catch(makeBoundaryFailure);
  }
}
