import {
  willCallFunction,
  willCallThrowingFunction,
  FunctionExecutorConfig,
  FunctionCompletedExceptionally,
  defineContract,
  shapedLike,
} from './index.js';

describe('function executor', () => {
  defineContract(
    {
      consumerName: 'function caller',
      providerName: 'function execution',
      changedContracts: 'OVERWRITE',
    },
    (contract) => {
      describe('function with no args', () => {
        it('returns nothing', () =>
          contract.runInteraction(
            {
              definition: willCallFunction({
                arguments: [],
                returnValue: null,
                functionName: 'zeroArgs',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              testResponse: (returnValue) => {
                expect(returnValue).toEqual(null);
              },
            },
          ));
      });
      describe('function with two args', () => {
        it('returns nothing', () =>
          contract.runInteraction(
            {
              definition: willCallFunction({
                arguments: ['example', 2],
                returnValue: 'example2',
                functionName: 'concatenate',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)('example', 2),
              testResponse: (returnValue: unknown) => {
                expect(returnValue).toEqual('example2');
              },
            },
          ));
      });
      describe('function that throws', () => {
        it('throws', () =>
          contract.runRejectingInteraction(
            {
              definition: willCallThrowingFunction({
                arguments: [],
                errorClassName: 'CustomError',
                functionName: 'throwsError',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              testErrorResponse: (e) => {
                expect(e).toBeInstanceOf(FunctionCompletedExceptionally);
                expect(
                  (e as FunctionCompletedExceptionally).errorClassName,
                ).toBe('CustomError');
              },
            },
          ));
      });
      describe('function that throws with error internals', () => {
        it('throws with the example error internals', () =>
          contract.runRejectingInteraction(
            {
              definition: willCallThrowingFunction({
                arguments: ['example'],
                errorClassName: 'ErrorWithInternals',
                errorInternals: shapedLike({
                  code: 123,
                  detail: 'some detail',
                }),
                responseName:
                  'throwing an ErrorWithInternals with error internals',
                functionName: 'throwsErrorWithInternals',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)('example'),
              testErrorResponse: (e) => {
                expect(e).toBeInstanceOf(FunctionCompletedExceptionally);
                const thrown = e as FunctionCompletedExceptionally;
                expect(thrown.errorClassName).toBe('ErrorWithInternals');
                // During definition, the mock throws the example error internals
                expect(thrown.errorInternals).toEqual({
                  code: 123,
                  detail: 'some detail',
                });
              },
            },
          ));
      });
    },
  );
});
