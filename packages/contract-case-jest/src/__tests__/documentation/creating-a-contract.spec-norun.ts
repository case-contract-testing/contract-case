/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */

import { willReceiveHttpRequest } from '../../boundaries/index.js';
// example-extract _creating-a-contract
import {
  ContractCaseDefiner,
  defineContract,
} from '@contract-case/contract-case-jest';

defineContract(
  {
    /* The name of the service writing the contract */
    consumerName: 'Example-Client',
    /* The name of the service that will verify the contract */
    providerName: 'Example-Server',
    /* Any additional ContractCaseConfig goes here */
  },
  (contract: ContractCaseDefiner) => {
    describe('some API method', () => {
      describe('with a valid access token', () => {
        it('behaves as expected', async () => {
          await contract.runExample(
            /* described later in this chapter */
            // ignore-extract
            {
              states: [''],
              definition: willReceiveHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                  headers: { accept: 'application/json' },
                },
                response: { status: 200, body: { status: 'up' } },
              }),
            },
            // end-ignore
          );
        });
      });

      describe('with no access token', () => {
        it('throws an error', async () => {
          await contract.runRejectingExample(
            /* described later in this chapter */
            // ignore-extract
            {
              states: [''],
              definition: willReceiveHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                  headers: { accept: 'application/json' },
                },
                response: { status: 200, body: { status: 'up' } },
              }),
            },
            // end-ignore
          );
        });
      });
    });
    /* arbitrary other contract examples */
  },
);
// end-example
