import { BoundaryCoreFunction } from '../../case-boundary/internals/index.js';

/**
 * A repository for functions that can be retrieved later
 */
export type FunctionRegistry = {
  /**
   * Registers a function to be called later
   * @param name - the name to use to retrieve this function later
   * @param fn - the {@link BoundaryCoreFunction} to register
   */
  registerCoreFunction: (name: string, fn: BoundaryCoreFunction) => void;
  /**
   * Gets a function that was previously registered with registerCoreFunction
   *
   * @param name -  The function name, registered previously
   * @returns An {@link BoundaryCoreFunction} that can always be called - it
   *   will return a BoundaryFailure if the function doesn't exist, and it is
   *   NeverFail - it will always return a successful promise.
   */
  getCoreFunction: (name: string) => BoundaryCoreFunction;
};
