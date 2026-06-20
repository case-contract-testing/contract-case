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
  HttpRequestConfig,
} from '@contract-case/contract-case-jest';
import { YourApi } from './YourApi.js';

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
          await contract.runInteraction({
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

        it('behaves as expected with a matcher', async () => {
          await contract.runInteraction({
            states: [
              inState('Server is up'),
              inState('A user with id "foo" exists'),
            ],
            definition: willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/users/foo',
              },
              // example-extract _matchers-intro
              response: {
                body: {
                  userId: 'foo',
                  // You can read this as "this test covers any 'name' property
                  // which is a string (for example, 'john smith').
                  name: anyString('john smith'),
                },
                status: 200,
              },
              // end-example
            }),
          });
        });
      });

      it('behaves as expected', async () => {
        // example-extract _defining-an-example-config
        await contract.runInteraction(
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
        await contract.runInteraction(
          {
            states: [
              /* as above */
              // example-extract _defining-states
              inState('Server is up'),
              inState('A user with id "foo" exists'),
              // end-example
              // example-extract _matchers-state-no-vars
              inState('A user with id "foo" exists'),
              // end-example
              // example-extract _matchers-state-with-vars
              inState('A user exists', { userId: 'foo' }),
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
      await contract.runInteraction(
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

      await contract.runInteraction(
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
      await contract.runInteraction({
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

    it('matchers example', async () => {
      // example-extract _matchers-state-vars-complete
      await contract.runInteraction(
        {
          states: [
            inState('Server is up'),
            // Here we tell ContractCase that there's
            // a userId variable returned by this state.
            // We give the example "foo", to be used
            // during the contract definition.
            //
            // During contract verification, the value of userId
            // value will be provided by the state setup function
            // in the provider test.
            inState('A user exists', { userId: 'foo' }),
          ],
          definition: willSendHttpRequest({
            request: {
              method: 'GET',
              path: '/users',
              // This matcher tells ContractCase that
              // the id in the query will be whatever
              // the userId is
              query: { id: stateVariable('userId') },
            },
            response: {
              status: 200,
              body: {
                // In the response body, we expect the
                // userId to be present
                userId: stateVariable('userId'),
                // and the name may be any non-empty string
                name: anyString('John Smith'),
              },
            },
          }),
        },
        {
          trigger: (interactionSetup: HttpRequestConfig) =>
            new YourApi(interactionSetup.mock.baseUrl).getUser(
              interactionSetup.getStateVariable('userId'),
            ),

          testResponse: (user, interactionSetup: HttpRequestConfig) => {
            expect(user).toEqual({
              userId: interactionSetup.getStateVariable('userId'),
              name: 'John Smith',
            });
          },
        },
      );
      // end-example

      await contract.runInteraction(
        {
          states: [
            inState('Server is up'),
            // Here we tell ContractCase that there's
            // a userId variable returned by this state.
            // We give the example "foo", to be used
            // during the contract definition.
            //
            // During contract verification, the value of userId
            // value will be provided by the state setup function
            // in the provider test.
            inState('A user exists', { userId: 'foo' }),
          ],
          definition: willSendHttpRequest({
            request: {
              method: 'GET',
              path: '/users',
              // This matcher tells ContractCase that
              // the id in the query will be whatever
              // the userId is
              query: { id: stateVariable('userId') },
            },
            response: {
              status: 200,
              body: {
                // In the response body, we expect the
                // userId to be present
                userId: stateVariable('userId'),
                // and the name may be any non-empty string
                name: anyString('John Smith'),
              },
            },
          }),
        },
        {
          // example-extract _trigger-http-client
          trigger: (interactionSetup: HttpRequestConfig) =>
            new YourApi(interactionSetup.mock.baseUrl).getUser(
              interactionSetup.getStateVariable('userId'),
            ),
          // end-example

          testResponse: (user, interactionSetup: HttpRequestConfig) => {
            expect(user).toEqual({
              userId: interactionSetup.getStateVariable('userId'),
              name: 'John Smith',
            });
          },
        },
      );
    });
  },
);
