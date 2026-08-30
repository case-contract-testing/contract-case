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
        it('throws UserNotFoundError with a payload', async () => {
          // example-extract _function-caller-throwing-payload
          await contract.runRejectingInteraction(
            {
              definition: willCallThrowingFunction({
                arguments: [],
                errorClassName: 'UserNotFoundError',
                // The payload describes the serialised content of the error.
                // Prefer distinct error classes over payload matching where you can.
                payload: shapedLike({ code: 404, detail: 'No such user' }),
                responseName: 'throwing a UserNotFoundError with a payload',
                functionName: 'getUser',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              testErrorResponse: (e) => {
                const thrown = e as FunctionCompletedExceptionally;
                // The mock throws an example payload that matches the contract
                expect(thrown.payload).toEqual({
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
