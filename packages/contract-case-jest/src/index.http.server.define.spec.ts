/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';

// These imports are our code under test
import type * as http from 'node:http';
import start from './__tests__/server/http.js';
import type { User } from './__tests__/server/entities/responses.js';
import type { Dependencies } from './__tests__/server/domain/types.js';
import { baseService } from './__tests__/server/domain/baseService.js';

import {
  inState,
  httpStatus,
  shapedLike,
  stateVariable,
  stringPrefix,
  StateHandlers,
  willReceiveHttpRequest,
  defineContract,
} from './index.js';

// Normally you just let Case set filename and test-run-id for you
const TEST_RUN_ID = 'PDC';
const FILENAME = `case-contracts/http-request-consumer-http-request-provider-${TEST_RUN_ID}.case.json`;

describe('e2e http provider driven', () => {
  beforeAll(() => {
    try {
      fs.rmSync(FILENAME);
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // We don't care if this fails
    }
  }, 30000);
  describe('test and write contract', () => {
    // CODE UNDER TEST SETUP BOILERPLATE
    let server: http.Server;
    let mockHealthStatus = true;
    let mockGetUser: (id: string) => User | undefined = () => undefined;
    const port = 8094;
    const serverDependencies: Dependencies = {
      healthService: {
        ready: () => mockHealthStatus,
      },
      baseService,
      userRepository: { get: (id) => mockGetUser(id) },
    };

    beforeAll(async () => {
      server = await start(port, serverDependencies);
    });

    afterAll(
      () =>
        new Promise<void>((resolve, reject) => {
          if (server) {
            server.close((err?: Error) => {
              if (err) reject(err);
              resolve();
            });
          } else {
            resolve();
          }
        }),
    );
    // END CODE UNDER TEST SETUP BOILERPLATE

    const stateHandlers: StateHandlers = {
      'Server is up': () => {
        mockHealthStatus = true;
      },
      'Server is down': () => {
        mockHealthStatus = false;
      },
      'A user exists': {
        setup: () => {
          // Make a user ID
          const userId = '42';
          // Mock the repository layer call
          // so that it returns a User object if called
          // with the ID above
          mockGetUser = (id) => {
            if (id === userId)
              return {
                userId,
                name: 'John',
              };
            return undefined;
          };
          // Return the userId as a state variable
          return { userId };
        },
        teardown: () => {
          // Remove the mock, so that the server state
          // was the same as it was before the test
          mockGetUser = () => undefined;
        },
      },
      'No users exist': () => {
        // Mock the repository layer call
        // so that it always returns nothing
        mockGetUser = () => undefined;
        // We still need to return a userId, since some tests expect
        // state variable to return it
        return { userId: '345' };
      },
    };

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
        // remove the following lines for your own tests
        testRunId: TEST_RUN_ID, // Remove this for your own tests
      },
      (contract) => {
        describe('health get', () => {
          describe('When the server is up', () => {
            const state = inState('Server is up');

            describe('health endpoint', () => {
              it('behaves as expected', () =>
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

              describe('arbitrary status response string', () => {
                it('behaves as expected', () =>
                  contract.runInteraction({
                    states: [state],
                    definition: willReceiveHttpRequest({
                      request: {
                        method: 'GET',
                        path: '/health',
                      },
                      response: {
                        status: 200,
                        body: shapedLike({ status: 'whatever' }),
                      },
                    }),
                  }));
              });
            });
          });
          describe('When the server is down', () => {
            const state = inState('Server is down');
            describe('No body server response', () => {
              it('calls server health', () =>
                contract.runRejectingInteraction({
                  states: [state],
                  definition: willReceiveHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                    },
                    response: { status: httpStatus(['4XX', '5XX']) },
                  }),
                }));
            });

            describe('specific server response', () => {
              it('calls server health', async () =>
                contract.runRejectingInteraction({
                  states: [state],
                  definition: willReceiveHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                    },
                    response: { status: 503, body: { status: 'down' } },
                  }),
                }));
            });
          });
        });
        describe('User', () => {
          describe('With query variables', () => {
            describe('when the user exists', () => {
              const responseBody = { userId: stateVariable('userId') };

              it('returns an existing user', async () =>
                contract.runInteraction({
                  states: [
                    inState('Server is up'),
                    inState('A user exists', { userId: '123' }),
                  ],
                  definition: willReceiveHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/users',
                      query: { id: stateVariable('userId') },
                    },
                    response: {
                      status: 200,
                      body: responseBody,
                    },
                  }),
                }));
            });
            describe("when the user doesn't exist", () => {
              it('returns a user not found error', () =>
                contract.runRejectingInteraction({
                  states: [
                    inState('Server is up'),
                    inState('No users exist', { userId: '123' }),
                  ],
                  definition: willReceiveHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/users',
                      query: { id: stateVariable('userId') },
                    },
                    response: {
                      status: 404,
                    },
                  }),
                }));
            });
          });
          describe('with path variables', () => {
            describe('when the user exists', () => {
              const responseBody = { userId: stateVariable('userId') };

              it('returns an existing user', async () =>
                contract.runInteraction({
                  states: [
                    inState('Server is up'),
                    inState('A user exists', { userId: '123' }),
                  ],
                  definition: willReceiveHttpRequest({
                    request: {
                      method: 'GET',
                      path: stringPrefix('/users/', stateVariable('userId')),
                    },
                    response: {
                      status: 200,
                      body: responseBody,
                    },
                  }),
                }));
            });
            describe("when the user doesn't exist", () => {
              it('returns a user not found error', () =>
                contract.runRejectingInteraction({
                  states: [
                    inState('Server is up'),
                    inState('No users exist', { userId: '123' }),
                  ],
                  definition: willReceiveHttpRequest({
                    request: {
                      method: 'GET',
                      path: stringPrefix('/users/', '123'),
                    },
                    response: {
                      status: 404,
                    },
                  }),
                }));
            });
          });
        });
      },
    );
  });
});
