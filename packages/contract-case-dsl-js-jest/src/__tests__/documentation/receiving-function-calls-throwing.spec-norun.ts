/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */

import { defineContract, ContractCaseDefiner } from '../../index.js';

// example-extract _function-receiver-throwing
// The throwing variants don't have convenience functions in
// the Typescript DSL yet, so use the definition class directly
// (from the @contract-case/case-definition-dsl package)
import { interactions } from '@contract-case/case-definition-dsl';

// ignore-extract
class CustomException extends Error {}

defineContract(
  {
    consumerName: 'function execution',
    providerName: 'function definer',
  },
  (contract: ContractCaseDefiner) => {
    describe('throwing function', () => {
      it('succeeds', async () => {
        // end-ignore
        contract.registerFunction('throwingFunction', () => {
          throw new CustomException('Oh no');
        });

        await contract.runInteraction({
          definition: new interactions.functions.WillReceiveFunctionCallAndThrow(
            {
              arguments: [],
              errorClassName: 'CustomException',
              functionName: 'throwingFunction',
            },
          ),
        });
        // end-example
      });
    });
  },
);
