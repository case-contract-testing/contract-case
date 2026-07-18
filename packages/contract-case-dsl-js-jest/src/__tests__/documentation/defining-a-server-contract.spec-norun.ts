/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable jest/expect-expect */

import { defineContract } from '../../index.js';

import {
  inState,
  httpStatus,
  StateHandlers,
  willReceiveHttpRequest,
} from '@contract-case/contract-case-jest';
import { User } from '../server/entities/responses.js';

// Server setup boilerplate - in a real test, you would
// start your own server before the tests run, injecting
// these mocks into its repository layer
const port = 8099;
let mockHealthStatus = true;
let mockGetUser: (id: string) => User | undefined = () => undefined;

// example-extract _http-server-state-handlers
const stateHandlers: StateHandlers = {
  'Server is up': () => {
    mockHealthStatus = true;
  },
  'Server is down': () => {
    mockHealthStatus = false;
  },
  'A user exists': {
    setup: () => {
      const userId = '42';
      mockGetUser = (id) =>
        id === userId ? { userId, name: 'John' } : undefined;
      // Return the userId as a state variable
      return { userId };
    },
    teardown: () => {
      mockGetUser = () => undefined;
    },
  },
};
// end-example

// example-extract _http-server-config
defineContract(
  {
    consumerName: 'http request consumer',
    providerName: 'http request provider',
    stateHandlers,
    mockConfig: {
      http: {
        // Replace this with your own server URL
        baseUrlUnderTest: `http://localhost:${port}`,
      },
    },
  },
  (contract) => {
    // ... interaction definitions go here
    // ignore-extract
    describe('an example placeholder', () => {
      it('is never run', () => {
        // In a real test, the mock variables above would be wired
        // into your running server's repository layer
        expect(mockHealthStatus).toBe(true);
        expect(mockGetUser('42')).toBeUndefined();
        return contract.runInteraction({
          states: [inState('Server is up')],
          definition: willReceiveHttpRequest({
            request: {
              method: 'GET',
              path: '/health',
            },
            response: { status: 200 },
          }),
        });
      });
    });
    // end-ignore
  },
);
// end-example

defineContract(
  {
    consumerName: 'http request consumer',
    providerName: 'http request provider',
    stateHandlers,
    mockConfig: {
      http: {
        baseUrlUnderTest: `http://localhost:${port}`,
      },
    },
  },
  (contract) => {
    // example-extract _http-server-interactions
    describe('When the server is up', () => {
      const state = inState('Server is up');

      it('returns a healthy status', () =>
        contract.runInteraction({
          states: [state],
          definition: willReceiveHttpRequest({
            request: {
              method: 'GET',
              path: '/health',
              headers: { accept: 'application/json' },
            },
            response: { status: 200, body: { status: 'up' } },
          }),
        }));
    });

    describe('When the server is down', () => {
      it('returns an error status', () =>
        contract.runRejectingInteraction({
          states: [inState('Server is down')],
          definition: willReceiveHttpRequest({
            request: {
              method: 'GET',
              path: '/health',
            },
            response: { status: httpStatus(['4XX', '5XX']) },
          }),
        }));
    });
    // end-example
  },
);
