import { BoundaryInvokableFunction } from '../types.js';
import { handleVoidResult } from './Result/index.js';

type Fn = (...args: unknown[]) => Promise<void>;

export const mapInvokableFunction =
  (invokeableFn: BoundaryInvokableFunction): Fn =>
  (...args: unknown[]): Promise<void> =>
    Promise.resolve()
      .then(() => invokeableFn(...args.map((arg) => JSON.stringify(arg))))
      .then((result) => handleVoidResult(result, 'CaseConfigurationError'));

export const mapInvokableFunctions = (
  invokeableFns: Record<string, BoundaryInvokableFunction>,
): Record<string, Fn> =>
  Object.entries(invokeableFns).reduce(
    (acc, [key, fn]) => ({
      ...acc,
      [key]: mapInvokableFunction(fn),
    }),
    {} as Record<string, Fn>,
  );
