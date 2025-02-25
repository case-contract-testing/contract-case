/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */

import { defineContract, ContractCaseDefiner } from '../../index.js';

// example-extract _defining-an-example-states
import {
  willSendHttpRequest,
  inState,
  stateVariable,
  stringPrefix,
  anyString,
} from '@contract-case/contract-case-jest';

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
        // end-ignore

        it('behaves as expected', async () => {
          await contract.runExample({
            states: [
              inState('Server is up'),
              inState('A user with id "foo" exists'),
            ],
            definition: willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/users/foo',
              },
              response: {
                status: 200,
                body: {
                  userId: 'foo',
                  name: 'john smith',
                },
              },
            }),
          });
        });
        // end-example
      });

      it('behaves as expected', async () => {
        // example-extract _defining-an-example-config
        await contract.runExample(
          {
            states: [
              /* as above */
              // ignore-extract
              inState('Server is up'),
              inState('A user with id "foo" exists'),
              // end-ignore
            ],
            definition:
              /* as above */
              // ignore-extract
              willSendHttpRequest({
                request: {
                  method: 'GET',
                  path: '/users/foo',
                },
                response: {
                  status: 200,
                  body: {
                    userId: 'foo',
                    name: 'john smith',
                  },
                },
              }),
            // end-ignore
          },
          { logLevel: 'debug' },
        );
        // end-example
      });

      it('defines states', async () => {
        await contract.runExample(
          {
            states: [
              /* as above */
              // example-extract _defining-states
              inState('Server is up'),
              inState('A user with id "foo" exists'),
              // end-example
            ],
            definition:
              /* as above */
              willSendHttpRequest({
                request: {
                  method: 'GET',
                  path: '/users/foo',
                },
                response: {
                  status: 200,
                  body: {
                    userId: 'foo',
                    name: 'john smith',
                  },
                },
              }),
            // end-ignore
          },
          { logLevel: 'debug' },
        );
      });
    });

    it('defines states in order', async () => {
      // example-extract _defining-states-order
      await contract.runExample(
        {
          states: [
            inState('Server is up'), // This one runs first
            inState('A user with id "foo" exists'), // This one runs second
          ],
          /* .... */
          // ignore-extract
          definition:
            /* as above */
            willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/users/foo',
              },
              response: {
                status: 200,
                body: {
                  userId: 'foo',
                  name: 'john smith',
                },
              },
            }),
          // end-ignore
        },
        { logLevel: 'debug' },
      );
      // end-example

      await contract.runExample(
        {
          states: [
            inState('Server is up'), // This one runs first
            // example-extract _state-variables
            inState('A user exists', { userId: 'foo' }),
            // end-example
          ],
          /* .... */
          definition:
            /* as above */
            willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/users/foo',
              },
              response: {
                status: 200,
                body: {
                  userId: 'foo',
                  name: 'john smith',
                },
              },
            }),
        },
        { logLevel: 'debug' },
      );

      // example-extract _state-matchers
      await contract.runExample({
        states: [
          inState('Server is up'),
          inState('A user exists', { userId: '123' }),
        ],
        definition: willSendHttpRequest({
          request: {
            method: 'GET',
            path: stringPrefix('/users/', stateVariable('userId')),
          },
          response: {
            status: 200,
            body: {
              userId: stateVariable('userId'),
              name: anyString('John Smith'),
            },
          },
        }),
        /* ... */
      });
    });
    // end-example
  },
);
