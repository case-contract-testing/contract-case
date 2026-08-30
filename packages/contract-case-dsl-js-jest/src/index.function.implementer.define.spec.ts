/* eslint-disable jest/expect-expect */
import {
  defineContract,
  shapedLike,
  willReceiveFunctionCall,
  willReceiveFunctionCallAndThrow,
} from './index.js';

class CustomError extends Error {}

class ErrorWithPayload extends Error {
  readonly code: number;

  readonly detail: string;

  constructor(message: string, code: number, detail: string) {
    super(message);
    this.code = code;
    this.detail = detail;
  }
}

describe('function receiver', () => {
  defineContract(
    {
      consumerName: 'function execution',
      providerName: 'function definer',
      // logLevel: 'maintainerDebug',
      //     changedContracts: 'OVERWRITE',
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
      describe('function that throws', () => {
        const THROWING_FUNCTION_HANDLE = 'THROWING FUNCTION';
        beforeAll(() => {
          contract.registerFunction(THROWING_FUNCTION_HANDLE, () => {
            throw new CustomError('Oh no');
          });
        });

        it('succeeds', () =>
          contract.runInteraction({
            definition: willReceiveFunctionCallAndThrow({
              arguments: [],
              errorClassName: 'CustomError',
              functionName: THROWING_FUNCTION_HANDLE,
            }),
          }));
      });
      describe('function that throws with a payload', () => {
        const THROWING_WITH_PAYLOAD_HANDLE = 'THROWING FUNCTION WITH PAYLOAD';
        beforeAll(() => {
          contract.registerFunction(THROWING_WITH_PAYLOAD_HANDLE, () => {
            throw new ErrorWithPayload('Oh no', 123, 'some detail');
          });
        });

        it('succeeds', () =>
          contract.runInteraction({
            definition: willReceiveFunctionCallAndThrow({
              arguments: [],
              errorClassName: 'ErrorWithPayload',
              payload: shapedLike({ code: 123, detail: 'some detail' }),
              responseName: 'throwing an ErrorWithPayload with a payload',
              functionName: THROWING_WITH_PAYLOAD_HANDLE,
            }),
          }));
      });
    },
  );
});
