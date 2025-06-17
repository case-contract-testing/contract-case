import { CaseCoreError } from '@contract-case/case-core';
import { BoundaryInvokableFunction } from '../types.js';
import { handleSuccessAnyResult } from './Result/index.js';
import { maintainerLog } from '../../../../domain/maintainerLog.js';

type Fn = (...args: unknown[]) => Promise<string>;

export const mapInvokableFunction =
  (invokeableFn: BoundaryInvokableFunction): Fn =>
  (...args: unknown[]): Promise<string> =>
    Promise.resolve()
      .then(() => invokeableFn(...args.map((arg) => JSON.stringify(arg))))
      .then((result) => {
        maintainerLog('Result from invocation was:', result);
        return handleSuccessAnyResult(result, 'CaseConfigurationError');
      })
      .then((resultString) => {
        try {
          return JSON.parse(resultString);
        } catch (e) {
          maintainerLog(
            'Error parsing response from invokeableFunction: ',
            e,
            'result was',
            resultString,
          );
          throw new CaseCoreError(
            `Unable to parse the payload returned by the invokeableFunction.

            This is probably a bug in your invokeable function, or the language-specific wrapper (${(e as Error | undefined)?.message}).

            The string that failed to parse was: ${resultString}`,
          );
        }
      });

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
