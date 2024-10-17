import { BoundaryCoreFunction } from '../../case-boundary/internals/index.js';

export type FunctionRegistry = {
  registerCoreFunction: (name: string, fn: BoundaryCoreFunction) => void;
  getCoreFunction: (name: string) => BoundaryCoreFunction;
};
