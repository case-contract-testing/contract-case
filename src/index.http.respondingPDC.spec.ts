/* eslint-disable no-template-curly-in-string */
/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';

// These imports are our code under test
import type * as http from 'node:http';
import start from './__tests__/server/http/connectors/web';
import type { User } from './__tests__/server/http/model/responses';
import type { Dependencies } from './__tests__/server/http/domain/types';
import { baseService } from './__tests__/server/http/domain/baseService';
import api from './__tests__/client/http/connector';
import { ApiError } from './__tests__/client/http/connector/internals/apiErrors';
import { UserNotFoundConsumerError } from './__tests__/client/http/connector/errors';

// This import is our Jest DSL
import { defineContract, verifyContract } from './boundaries/jest/jest';

import {
  inState,
  httpStatus,
  shapedLike,
  stateVariable,
  stringPrefix,
  StateHandlers,
  readContract,
  willReceiveHttpRequest,
  HttpRequestConfig,
} from '.';

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
  });
  describe('test and write contract', () => {
    // CODE UNDER TEST SETUP BOILERPLATE
    let server: http.Server;
    let mockHealthStatus = true;
    let mockGetUser: (id: string) => User | undefined = () => undefined;
    const port = 8090;
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
        })
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
          const userId = '42';
          mockGetUser = (id) => {
            if (id === userId)
              return {
                userId,
                name: 'John',
              };
            return undefined;
          };
          return { userId };
        },
        teardown: () => {
          mockGetUser = () => undefined;
        },
      },
      'No users exist': () => {
        mockGetUser = () => undefined;
      },
    };

    defineContract(
      {
        consumerName: 'http request consumer',
        providerName: 'http request provider',
        config: {
          testRunId: TEST_RUN_ID,
          baseUrlUnderTest: `http://localhost:${port}`,
          printResults: false,
          stateHandlers,
        },
      },
      (contract) => {
        describe('health get', () => {
          describe('When the server is up', () => {
            const state = inState('Server is up');

            describe('health endpoint', () => {
              it('behaves as expected', () =>
                contract.runExample({
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
                  contract.runExample({
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
                contract.runRejectingExample({
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
                contract.runRejectingExample({
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
                contract.runExample({
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
                contract.runRejectingExample({
                  states: [inState('Server is up'), inState('No users exist')],
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
                contract.runExample({
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
                contract.runRejectingExample({
                  states: [inState('Server is up'), inState('No users exist')],
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
      }
    );
  });
});
verifyContract(
  readContract(FILENAME),
  {
    printResults: false,
  },
  (verifier) => {
    verifier.verifyContract({
      triggers: {
        'an http "GET" request to "/health" without a body': {
          trigger: (config: HttpRequestConfig) => api(config.baseUrl).health(),
          verifiers: {
            'a (200) response with body an object shaped like {status: "up"}': (
              health
            ) => {
              expect(health).toEqual('up');
            },
            'a (200) response with body an object shaped like {status: <any string>}':
              (health) => expect(typeof health).toBe('string'),
          },
          errorVerifiers: {
            'a (httpStaus 4XX | 5XX) response without a body': (e) => {
              expect(e).toBeInstanceOf(ApiError);
            },
            'a (503) response with body an object shaped like {status: "down"}':
              (e) => {
                expect(e).toBeInstanceOf(ApiError);
              },
          },
        },
        'an http "GET" request to "/health" without a body with the following headers an object shaped like {accept: "application/json"}':
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).health(),
            verifiers: {
              'a (200) response with body an object shaped like {status: "up"}':
                (health) => {
                  expect(health).toEqual('up');
                },
            },
            errorVerifiers: {},
          },
        'an http "GET" request to "/users"?id=123 without a body': {
          trigger: (config: HttpRequestConfig) =>
            api(config.baseUrl).getUserByQuery(
              (config.variables['userId'] as string) || '123'
            ),
          verifiers: {
            'a (200) response with body an object shaped like {userId: ${userId}}':
              (user, config) => {
                expect(user).toEqual({
                  userId: config.variables['userId'],
                });
              },
          },
          errorVerifiers: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
        'an http "GET" request to "/users/123" without a body': {
          trigger: (config: HttpRequestConfig) =>
            api(config.baseUrl).getUserByPath('123'),
          verifiers: {},
          errorVerifiers: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
        'an http "GET" request to "/users/${userId}" without a body': {
          trigger: (config: HttpRequestConfig) =>
            api(config.baseUrl).getUserByPath(
              config.variables['userId'] as string
            ),
          verifiers: {
            'a (200) response with body an object shaped like {userId: ${userId}}':
              (user, config) => {
                expect(user).toEqual({
                  userId: config.variables['userId'],
                });
              },
          },
          errorVerifiers: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
      },
    });
  }
);
