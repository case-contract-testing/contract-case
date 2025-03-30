import {
  willCallFunction,
  FunctionExecutorConfig,
  defineContract,
} from './index.js';

describe('function executor', () => {
  defineContract(
    {
      consumerName: 'function caller',
      providerName: 'function execution',
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
    },
  );
});
