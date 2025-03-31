import { BoundaryFailure } from '@contract-case/case-connector/cjs';

export const makeBoundaryFailure = (error: Error): BoundaryFailure =>
  new BoundaryFailure(
    error.name,
    error.message,
    error.stack ?? 'no-stack-trace',
    // TODO: Properly propagate stack traces
    error.stack ?? 'no-stack-trace',
  );
