/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */


import { defineContract, ContractCaseDefiner } from '../../index.js';

// example-extract _function-caller-throwing
// The throwing variants don't have convenience functions in
// the Typescript DSL yet, so use the definition class directly
// (from the @contract-case/case-definition-dsl package)
import { interactions } from '@contract-case/case-definition-dsl';
import { FunctionExecutorConfig } from '@contract-case/contract-case-jest';

// ignore-extract
defineContract(
  {
    consumerName: 'function caller',
    providerName: 'function execution',
  },
  (contract: ContractCaseDefiner) => {
    describe('getUser function', () => {
      describe('when the user does not exist', () => {
        it('throws UserNotFoundError', async () => {
          // end-ignore
          await contract.runRejectingInteraction(
            {
              definition: new interactions.functions.WillCallThrowingFunction({
                arguments: [],
                errorClassName: 'UserNotFoundError',
                functionName: 'getUser',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              // During definition, the mock function throws an Error with a
              // message containing the errorClassName defined above
              testErrorResponse: (e) => {
                expect(e.message).toContain('UserNotFoundError');
              },
            },
          );
          // end-example
        });
      });
    });
  },
);
