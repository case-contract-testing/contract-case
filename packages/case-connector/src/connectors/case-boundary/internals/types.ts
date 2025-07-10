import { BoundaryResult } from './boundary/index.js';

// export * from './types.ts-boundary';
export * from './types.jsii-boundary.js';

/**
 * Represents a function that can be invoked by the framework.
 * Must never throw an error, and must always return a successful promise
 * containing a BoundaryResult (which may be a failure, as long as the
 * promise is successful)
 *
 * This function should expect json encoded string arguments,
 * and return (via a {@link BoundarySuccessWithAny}) a json encoded return value.
 * It is the responsibility of the language DSL to map between these json
 * results / arguments and whatever language types are expected / appropriate.
 *
 * When implementing the mapping, make sure you map any void returns to null.
 *
 * In order to support the semantics of functions in multiple languages,
 * ContractCase is unable to tell the difference between functions that return void
 * and functions that return null.
 *
 */
export type BoundaryInvokableFunction = (
  ...args: string[]
) => Promise<BoundaryResult>;

/**
 * Represents a test that can be called later
 */
export type BoundaryContractVerificationTestHandle = {
  testName: string;
  testIndex: number;
  contractIndex: number;
};
