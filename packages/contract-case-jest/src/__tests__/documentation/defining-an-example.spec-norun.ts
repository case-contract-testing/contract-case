/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */

import { defineContract, ContractCaseDefiner } from '../../index.js';

// example-extract _defining-an-example
import { willSendHttpRequest } from '@contract-case/contract-case-jest';

// ignore-extract
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
          // end-ignore
          await contract.runInteraction({
            definition: willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/users/foo',
              },
              response: {
                status: 200,
                body: {
                  // Note that we only describe the fields
                  // that your consumer actually needs for
                  // this particular test.  The real response
                  // might have more elements, but if your
                  // consumer doesn't need them, you don't
                  // need to put them in the contract.
                  userId: 'foo',
                  name: 'john smith',
                },
              },
            }),
          });
          // end-example
        });
      });
    });
  },
);
