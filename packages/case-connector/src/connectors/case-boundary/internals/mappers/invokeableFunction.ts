import { BoundaryInvokableFunction } from '../types.js';
import { handleSuccessAnyResult } from './Result/index.js';

type Fn = (...args: unknown[]) => Promise<string>;

export const mapInvokableFunction =
  (invokeableFn: BoundaryInvokableFunction): Fn =>
  (...args: unknown[]): Promise<string> =>
    Promise.resolve()
      .then(() => invokeableFn(...args.map((arg) => JSON.stringify(arg))))
      .then((result) =>
        handleSuccessAnyResult(result, 'CaseConfigurationError'),
      );

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
