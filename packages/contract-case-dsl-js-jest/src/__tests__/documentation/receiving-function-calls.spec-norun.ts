/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */

import { defineContract, ContractCaseDefiner } from '../../index.js';

// example-extract _function-receiver-define
import { willReceiveFunctionCall } from '@contract-case/contract-case-jest';

// ignore-extract
defineContract(
  {
    /* The name of the service writing the contract */
    consumerName: 'function execution',
    /* The name of the service that will verify the contract */
    providerName: 'function definer',
    /* Any additional ContractCaseConfig goes here */
  },
  (contract: ContractCaseDefiner) => {
    describe('function with args', () => {
      // end-ignore
      // This string can be anything you like, as long as it's the same when
      // registering the function and when defining the interaction
      const FUNCTION_HANDLE = 'HAS ARGS FUNCTION';

      beforeAll(() => {
        contract.registerFunction(
          FUNCTION_HANDLE,
          (s: string, n: number) => `${s}${n}`,
        );
      });

      it('succeeds', () =>
        contract.runInteraction({
          definition: willReceiveFunctionCall({
            arguments: ['example', 2],
            returnValue: 'example2',
            functionName: FUNCTION_HANDLE,
          }),
        }));
      // end-example
    });
  },
);
