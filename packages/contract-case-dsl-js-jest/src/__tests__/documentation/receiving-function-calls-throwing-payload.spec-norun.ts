/* eslint-disable jest/expect-expect */

import {
  defineContract,
  ContractCaseDefiner,
  shapedLike,
  willReceiveFunctionCallAndThrow,
} from '../../index.js';

defineContract(
  {
    consumerName: 'function execution',
    providerName: 'function definer',
  },
  (contract: ContractCaseDefiner) => {
    describe('throwing function with a payload', () => {
      it('succeeds', async () => {
        // example-extract _function-receiver-throwing-payload
        // The error's own enumerable properties (here, code and detail)
        // become the payload
        class ComplexException extends Error {
          constructor(
            message: string,
            readonly code: number,
            readonly detail: string,
          ) {
            super(message);
          }
        }

        contract.registerFunction('throwingFunctionWithPayload', () => {
          throw new ComplexException('Oh no', 123, 'some detail');
        });

        await contract.runInteraction({
          definition: willReceiveFunctionCallAndThrow({
            arguments: [],
            errorClassName: 'ComplexException',
            payload: shapedLike({ code: 123, detail: 'some detail' }),
            responseName: 'throwing a ComplexException with a payload',
            functionName: 'throwingFunctionWithPayload',
          }),
        });
        // end-example
      });
    });
  },
);
