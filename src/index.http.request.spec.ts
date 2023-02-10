import * as fs from 'node:fs';
import type * as http from 'node:http';

import api from '__tests__/client/http/connector';
import { ApiError } from '__tests__/client/http/connector/internals/apiErrors';
import type {
  AnyInteractionType,
  Assertable,
  CaseInteractionFor,
} from 'entities/types';
import {
  httpStatus,
  shapedLike,
  stateVariable,
  stringPrefix,
} from 'boundaries/dsl/Matchers';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { readContract } from 'connectors/contract/writer/fileSystem';
import type { RunTestCallback } from 'connectors/contract/types';
import type { AnyState, StateFunctions } from 'entities/states/types';

import start from '__tests__/server/http/connectors/web';
import { baseService } from '__tests__/server/http/domain/baseService';
import type { User } from '__tests__/server/http/model/responses';
import { UserNotFoundConsumerError } from '__tests__/client/http/connector/errors';
import type { Dependencies } from '__tests__/server/http/domain/types';

import { inState, CaseContract, CaseVerifier } from '.';

const contractDetails = {
  consumerName: 'http response consumer',
  providerName: 'http response provider',
};

describe('e2e http consumer driven', () => {
  beforeAll(() => {
    try {
      fs.rmSync('case-contracts', { recursive: true });
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // We don't care if this fails
    }
  });
  describe('test and write contract', () => {
    const contract = new CaseContract(contractDetails, {
      testRunId: '12',
    });

    // JEST BOILERPLATE
    const testInteraction = <T extends AnyInteractionType, R>(
      states: Array<AnyState>,
      interaction: CaseInteractionFor<T>,
      trigger: (config: Assertable<T>['config']) => Promise<R>,
      testResponseObject: (data: R) => unknown
    ) =>
      contract.executeTest(states, interaction, (config) =>
        trigger(config).then(testResponseObject)
      );

    const testFailedInteraction = <T extends AnyInteractionType, R>(
      states: Array<AnyState>,
      interaction: CaseInteractionFor<T>,
      trigger: (config: Assertable<T>['config']) => Promise<R>,
      testResponseObject: (error: Error) => unknown
    ) =>
      contract.executeTest(states, interaction, (config) =>
        trigger(config).then((d) => {
          throw new Error(`Expected an error, but was ${d}`);
        }, testResponseObject)
      );

    afterAll(() => contract.endRecord());

    // END JEST BOILERPLATE

    describe('health get', () => {
      const sendHealthRequest = (
        config: Assertable<'ConsumeHttpResponse'>['config']
      ) => api(config.baseUrl).health();
      describe('When the server is up', () => {
        const state = inState('Server is up');

        describe('health endpoint', () => {
          it('behaves as expected', () =>
            testInteraction(
              [state],
              willSendHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
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
              testInteraction(
                [state],
                willSendHttpInteraction({
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
            testFailedInteraction(
              [state],
              willSendHttpInteraction({
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
            testFailedInteraction(
              [state],
              willSendHttpInteraction({
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
      const sendUserRequest =
        (userId: string) =>
        (config: Assertable<'ConsumeHttpResponse'>['config']) =>
          api(config.baseUrl).getUser(userId);
      describe('when the user exists', () => {
        const responseBody = { userId: stateVariable('userId') };

        it('returns an existing user', async () =>
          testInteraction(
            [
              inState('Server is up'),
              inState('A user exists', { userId: '123' }),
            ],
            willSendHttpInteraction({
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
          testFailedInteraction(
            [inState('Server is up'), inState('No users exist')],
            willSendHttpInteraction({
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

  describe('Server verification', () => {
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
    const verifier = new CaseVerifier(
      readContract(
        'case-contracts/http-response-consumer-http-response-provider-12.case.json'
      ),
      {
        baseUrlUnderTest: `http://localhost:${port}`,
        printResults: false,
      }
    );
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

    const stateSetups: StateFunctions = {
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
      // JEST BOILERPLATE
      const runJestTest: RunTestCallback = (
        testName: string,
        verify: () => Promise<unknown>
      ): void => {
        // eslint-disable-next-line jest/expect-expect
        it(`${testName}`, () => verify());
      };

      // END JEST BOILERPLATE

      describe('contract verification', () => {
        verifier.verifyContract(stateSetups, runJestTest);
      });
    });
  });
});
