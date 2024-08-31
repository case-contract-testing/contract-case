import { BoundaryResult } from './boundary/index.js';

// export * from './types.ts-boundary';
export * from './types.jsii-boundary.js';

/**
 * Represents a function that can be invoked by the framework.
 * Can never throw an error, and must always return a successful BoundaryResult
 * Promise (which may be a failure, as long as the promise is successful)
 */
export type BoundaryInvokableFunction = (
  ...args: string[]
) => Promise<BoundaryResult>;
