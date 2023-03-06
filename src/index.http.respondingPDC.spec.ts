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
import { runJestTest } from './__tests__/jest';

// These imports support the partial DSL that hasn't been extracted yet
import type {
  AnyMockDescriptorType,
  CaseMockDescriptorFor,
  AnyState,
} from './entities/types';

import {
  inState,
  CaseContract,
  CaseVerifier,
  httpStatus,
  shapedLike,
  stateVariable,
  stringPrefix,
  StateHandlers,
  readContract,
  willReceiveHttpRequest,
  HttpRequestConfig,
} from '.';

const contractDetails = {
  consumerName: 'http request consumer',
  providerName: 'http request provider',
};

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

    const contract = new CaseContract(contractDetails, {
      testRunId: TEST_RUN_ID,
      baseUrlUnderTest: `http://localhost:${port}`,
      printResults: false,
    });

    afterAll(() =>
      new Promise<void>((resolve, reject) => {
        if (server) {
          server.close((err?: Error) => {
            if (err) reject(err);
            resolve();
          });
        } else {
          resolve();
        }
      }).finally(() => contract.endRecord())
    );

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

    // JEST BOILERPLATE
    const testMock = <T extends AnyMockDescriptorType>(
      states: Array<AnyState>,
      mock: CaseMockDescriptorFor<T>
    ) =>
      contract.executeTest({
        states,
        mock,
        stateHandlers,
      });

    const testFailedMock = <T extends AnyMockDescriptorType>(
      states: Array<AnyState>,
      mock: CaseMockDescriptorFor<T>
    ) =>
      contract.executeTest({
        states,
        mock,
        stateHandlers,
      });

    // END JEST BOILERPLATE

    describe('health get', () => {
      describe('When the server is up', () => {
        const state = inState('Server is up');

        describe('health endpoint', () => {
          it('behaves as expected', () =>
            testMock(
              [state],
              willReceiveHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                  headers: { accept: 'application/json' },
                },
                response: { status: 200, body: { status: 'up' } },
              })
            ));

          describe('arbitrary status response string', () => {
            it('behaves as expected', () =>
              testMock(
                [state],
                willReceiveHttpRequest({
                  request: {
                    method: 'GET',
                    path: '/health',
                  },
                  response: {
                    status: 200,
                    body: shapedLike({ status: 'whatever' }),
                  },
                })
              ));
          });
        });
      });
      describe('When the server is down', () => {
        const state = inState('Server is down');
        describe('No body server response', () => {
          it('calls server health', () => {
            testFailedMock(
              [state],
              willReceiveHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: httpStatus(['4XX', '5XX']) },
              })
            );
          });
        });

        describe('specific server response', () => {
          it('calls server health', async () => {
            testFailedMock(
              [state],
              willReceiveHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: 503, body: { status: 'down' } },
              })
            );
          });
        });
      });
    });
    describe('User', () => {
      describe('when the user exists', () => {
        const responseBody = { userId: stateVariable('userId') };

        it('returns an existing user', async () =>
          testMock(
            [
              inState('Server is up'),
              inState('A user exists', { userId: '123' }),
            ],
            willReceiveHttpRequest({
              request: {
                method: 'GET',
                path: stringPrefix('/users/', stateVariable('userId')),
              },
              response: {
                status: 200,
                body: responseBody,
              },
            })
          ));
      });
      describe("when the user doesn't exist", () => {
        it('returns a user not found error', () =>
          testFailedMock(
            [inState('Server is up'), inState('No users exist')],
            willReceiveHttpRequest({
              request: {
                method: 'GET',
                path: stringPrefix('/users/', '123'),
              },
              response: {
                status: 404,
              },
            })
          ));
      });
    });
  });
});

describe('Client verification', () => {
  const verifier = new CaseVerifier(readContract(FILENAME), {
    printResults: false,
  });

  describe('with a file contract', () => {
    describe('contract verification', () => {
      verifier.verifyContract(
        {
          triggers: {
            'an http "GET" request to "/health" without a body': {
              trigger: (config: HttpRequestConfig) =>
                api(config.baseUrl).health(),
              verifiers: {
                'a (200) response with body an object shaped like {status: "up"}':
                  (health) => {
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
            'an http "GET" request to "/users/123" without a body': {
              trigger: (config: HttpRequestConfig) =>
                api(config.baseUrl).getUser('123'),
              verifiers: {},
              errorVerifiers: {
                'a (404) response without a body': (e) => {
                  expect(e).toBeInstanceOf(UserNotFoundConsumerError);
                },
              },
            },
            'an http "GET" request to "/users/${userId}" without a body': {
              trigger: (config: HttpRequestConfig) =>
                api(config.baseUrl).getUser(
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
        },
        runJestTest
      );
    });
  });
});
