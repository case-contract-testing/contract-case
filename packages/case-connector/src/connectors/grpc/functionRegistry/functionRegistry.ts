import {
  BoundaryCoreFunction,
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundaryResult,
} from '../../case-boundary/internals/index.js';
import { FunctionRegistry } from './types.js';

export const makeFunctionRegistry = (): FunctionRegistry => {
  const coreFunctions: Record<string, BoundaryCoreFunction> = {};

  const registerCoreFunction = (name: string, fn: BoundaryCoreFunction) => {
    coreFunctions[name] = fn;
  };

  const getCoreFunction =
    (name: string): BoundaryCoreFunction =>
    (...args: string[]): Promise<BoundaryResult> =>
      Promise.resolve().then(() => {
        if (coreFunctions[name] == null) {
          return new BoundaryFailure(
            BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR,
            `There's no available function with the name '${name}'`,
            'core connector',
            // TODO: Need to allow the core to tell the DSL to log its call site
            '',
          );
        }
        return coreFunctions[name](...args);
      });

  return { registerCoreFunction, getCoreFunction };
};
