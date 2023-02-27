// These imports are our code under test
import type * as http from 'node:http';
import api from '__tests__/client/http/connector';
import { ApiError } from '__tests__/client/http/connector/internals/apiErrors';
import start from '__tests__/server/http/connectors/web';
import { baseService } from '__tests__/server/http/domain/baseService';
import type { User } from '__tests__/server/http/model/responses';
import { UserNotFoundConsumerError } from '__tests__/client/http/connector/errors';
import type { Dependencies } from '__tests__/server/http/domain/types';

// This import is our Jest DSL
import {
  runCaseExample as jestRunCaseExample,
  runCaseRejectExample as jestRunCaseRejectExample,
  runJestTest,
} from '__tests__/jest';

// These imports support the partial DSL that hasn't been extracted yet
import type { AnyMockDescriptorType } from 'entities/types';
import * as fs from 'node:fs';

// These imports are from Case
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
  willSendHttpRequest,
  HttpRequestConfig,
  AnyState,
  Assertable,
  CaseMockDescriptorFor,
} from '.';

const contractDetails = {
  consumerName: 'http response consumer',
  providerName: 'http response provider',
};

const TEST_RUN_ID = '12';
const FILENAME = `case-contracts/http-response-consumer-http-response-provider-${TEST_RUN_ID}.case.json`;

describe('e2e http consumer driven', () => {
  beforeAll(() => {
    // Delete the contract file first
    try {
      fs.rmSync(FILENAME);
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // We don't care if this fails
    }
  });
  describe('test and write contract', () => {
    // JEST BOILERPLATE
    const contract = new CaseContract(contractDetails, {
      testRunId: TEST_RUN_ID,
      printResults: false,
    });
    const runCaseExample = <T extends AnyMockDescriptorType, R>(
      states: Array<AnyState>,
      mock: CaseMockDescriptorFor<T>,
      trigger: (config: Assertable<T>['config']) => Promise<R>,
      testResponseObject: (data: R) => unknown
    ) =>
      jestRunCaseExample(contract, states, mock, trigger, testResponseObject);

    const runCaseRejectExample = <T extends AnyMockDescriptorType, R>(
      states: Array<AnyState>,
      mock: CaseMockDescriptorFor<T>,
      trigger: (config: Assertable<T>['config']) => Promise<R>,
      testResponseObject: (data: Error) => unknown
    ) =>
      jestRunCaseRejectExample(
        contract,
        states,
        mock,
        trigger,
        testResponseObject
      );

    afterAll(() => contract.endRecord());

    // END JEST BOILERPLATE

    describe('health get', () => {
      const sendHealthRequest = (config: HttpRequestConfig) =>
        api(config.baseUrl).health();
      describe('When the server is up', () => {
        const state = inState('Server is up');

        describe('health endpoint', () => {
          it('behaves as expected', () =>
            runCaseExample(
              [state],
              willSendHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                  headers: { accept: 'application/json' },
                },
                response: { status: 200, body: { status: 'up' } },
              }),
              sendHealthRequest,
              (health) => {
                expect(health).toEqual('up');
              }
            ));

          describe('arbitrary status response string', () => {
            it('behaves as expected', () =>
              runCaseExample(
                [state],
                willSendHttpRequest({
                  request: {
                    method: 'GET',
                    path: '/health',
                  },
                  response: {
                    status: 200,
                    body: shapedLike({ status: 'whatever' }),
                  },
                }),
                sendHealthRequest,
                (health) => {
                  expect(health).toEqual('whatever');
                }
              ));
          });
        });
      });
      describe('When the server is down', () => {
        const state = inState('Server is down');
        describe('No body server response', () => {
          it('calls server health', () => {
            runCaseRejectExample(
              [state],
              willSendHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: httpStatus(['4XX', '5XX']) },
              }),
              sendHealthRequest,
              (e) => {
                expect(e).toBeInstanceOf(ApiError);
              }
            );
          });
        });

        describe('specific server response', () => {
          it('calls server health', async () => {
            runCaseRejectExample(
              [state],
              willSendHttpRequest({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: 503, body: { status: 'down' } },
              }),
              sendHealthRequest,
              (e) => {
                expect(e).toBeInstanceOf(ApiError);
              }
            );
          });
        });
      });
    });
    describe('User', () => {
      const sendUserRequest = (userId: string) => (config: HttpRequestConfig) =>
        api(config.baseUrl).getUser(userId);
      describe('when the user exists', () => {
        const responseBody = { userId: stateVariable('userId') };

        it('returns an existing user', async () =>
          runCaseExample(
            [
              inState('Server is up'),
              inState('A user exists', { userId: '123' }),
            ],
            willSendHttpRequest({
              request: {
                method: 'GET',
                path: stringPrefix('/users/', stateVariable('userId')),
              },
              response: {
                status: 200,
                body: responseBody,
              },
            }),
            sendUserRequest('123'),
            (health) => {
              expect(contract.stripMatchers(responseBody)).toEqual({
                userId: '123',
              });
              expect(health).toEqual(contract.stripMatchers(responseBody));
            }
          ));
      });
      describe("when the user doesn't exist", () => {
        it('returns a user not found error', () =>
          runCaseRejectExample(
            [inState('Server is up'), inState('No users exist')],
            willSendHttpRequest({
              request: {
                method: 'GET',
                path: stringPrefix('/users/', '123'),
              },
              response: {
                status: 404,
              },
            }),
            sendUserRequest('123'),
            (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            }
          ));
      });
    });
  });
});

describe('Server verification', () => {
  // PROVIDER SETUP BOILERPLATE
  let server: http.Server;
  let mockHealthStatus = true;
  let mockGetUser: (id: string) => User | undefined = () => undefined;
  const port = 8087;
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
  // END PROVIDER SETUP BOILERPLATE

  const verifier = new CaseVerifier(readContract(FILENAME), {
    baseUrlUnderTest: `http://localhost:${port}`,
    printResults: false,
  });

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
  describe('with a file contract', () => {
    describe('contract verification', () => {
      verifier.verifyContract({ stateHandlers }, runJestTest);
    });
  });
});
