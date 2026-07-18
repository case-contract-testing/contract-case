/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */


import { defineContract, ContractCaseDefiner } from '../../index.js';

// example-extract _function-caller-define
import {
  willCallFunction,
  FunctionExecutorConfig,
} from '@contract-case/contract-case-jest';

// ignore-extract
defineContract(
  {
    /* The name of the service writing the contract */
    consumerName: 'function caller',
    /* The name of the service that will verify the contract */
    providerName: 'function execution',
    /* Any additional ContractCaseConfig goes here */
  },
  (contract: ContractCaseDefiner) => {
    describe('concatenate function', () => {
      it('returns the concatenation of its arguments', async () => {
        // end-ignore
        await contract.runInteraction(
          {
            definition: willCallFunction({
              arguments: ['example', 2],
              returnValue: 'example2',
              functionName: 'concatenate',
            }),
          },
          {
            // The trigger calls the mock function that ContractCase
            // has set up for this interaction (see below)
            trigger: async (setup: FunctionExecutorConfig) =>
              setup.getFunction(setup.mock.functionHandle)('example', 2),
            // The testResponse function asserts on the value
            // returned by the trigger
            testResponse: (returnValue) => {
              expect(returnValue).toEqual('example2');
            },
          },
        );
        // end-example
      });
    });
  },
);
