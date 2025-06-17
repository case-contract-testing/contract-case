/* eslint-disable jest/expect-expect */
import { defineContract, willReceiveFunctionCall } from './index.js';

describe('function receiver', () => {
  defineContract(
    {
      consumerName: 'function execution',
      providerName: 'function definer',
      logLevel: 'maintainerDebug',
      changedContracts: 'OVERWRITE',
      // Usually you will not need to provide a filename
    },
    (contract) => {
      describe('function with no args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const NO_ARG_FUNCTION_HANDLE = 'NO ARG FUNCTION';
        beforeAll(() => {
          contract.registerFunction(NO_ARG_FUNCTION_HANDLE, () => {});
        });

        it('succeeds', () =>
          contract.runInteraction({
            definition: willReceiveFunctionCall({
              arguments: [],
              returnValue: null,
              functionName: NO_ARG_FUNCTION_HANDLE,
            }),
          }));
      });
      describe('function with args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const FUNCTION_WITH_ARG_HANDLE = 'HAS ARGS FUNCTION';
        beforeAll(() => {
          contract.registerFunction(
            FUNCTION_WITH_ARG_HANDLE,
            (s: string, n: number) => `${s}${n}`,
          );
        });

        it('succeeds', () =>
          contract.runInteraction({
            definition: willReceiveFunctionCall({
              arguments: ['example', 2],
              returnValue: 'example2',
              functionName: FUNCTION_WITH_ARG_HANDLE,
            }),
          }));
      });
    },
  );
});
