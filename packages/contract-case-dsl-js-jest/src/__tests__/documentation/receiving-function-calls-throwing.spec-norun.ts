/* eslint-disable jest/expect-expect */

import {
  defineContract,
  ContractCaseDefiner,
  willReceiveFunctionCallAndThrow,
} from '../../index.js';

class CustomException extends Error {}

defineContract(
  {
    consumerName: 'function execution',
    providerName: 'function definer',
  },
  (contract: ContractCaseDefiner) => {
    describe('throwing function', () => {
      it('succeeds', async () => {
        // example-extract _function-receiver-throwing
        contract.registerFunction('throwingFunction', () => {
          throw new CustomException('Oh no');
        });

        await contract.runInteraction({
          definition: willReceiveFunctionCallAndThrow({
            arguments: [],
            errorClassName: 'CustomException',
            functionName: 'throwingFunction',
          }),
        });
        // end-example
      });
    });
  },
);
