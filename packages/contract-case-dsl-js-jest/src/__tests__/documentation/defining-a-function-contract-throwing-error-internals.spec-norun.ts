import {
  defineContract,
  ContractCaseDefiner,
  willCallThrowingFunction,
  shapedLike,
  FunctionCompletedExceptionally,
  FunctionExecutorConfig,
} from '../../index.js';

defineContract(
  {
    consumerName: 'function caller',
    providerName: 'function execution',
  },
  (contract: ContractCaseDefiner) => {
    describe('getUser function', () => {
      describe('when the user does not exist', () => {
        it('throws UserNotFoundError with error internals', async () => {
          // example-extract _function-caller-throwing-error-internals
          await contract.runRejectingInteraction(
            {
              definition: willCallThrowingFunction({
                arguments: [],
                errorClassName: 'UserNotFoundError',
                // The errorInternals matcher describes the serialised content of the error.
                // Prefer distinct error classes over error internals matching where you can.
                errorInternals: shapedLike({
                  code: 404,
                  detail: 'No such user',
                }),
                responseName:
                  'throwing a UserNotFoundError with error internals',
                functionName: 'getUser',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              testErrorResponse: (e) => {
                const thrown = e as FunctionCompletedExceptionally;
                // The mock throws example error internals that match the contract
                expect(thrown.errorInternals).toEqual({
                  code: 404,
                  detail: 'No such user',
                });
              },
            },
          );
          // end-example
        });
      });
    });
  },
);
