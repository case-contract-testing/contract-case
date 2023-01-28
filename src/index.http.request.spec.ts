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

    afterAll(() => contract.endRecord());
    let context: Assertable<'ConsumeHttpResponse'>;
    describe('health get', () => {
      describe('When the server is up', () => {
        const state = inState('Server is up');

        const testInteraction = <T extends AnyInteractionType, R>(
          states: Array<AnyState>,
          interaction: CaseInteractionFor<T>,
          trigger: (config: Assertable<T>['config']) => Promise<R>,
          testResponseObject: (data: R) => unknown
        ) =>
          contract.setup(states, interaction).then((assertable) =>
            // setup states, either default or real
            // trigger, either fake or provided
            trigger(assertable.config)
              // either check response object, or compare it
              .then(testResponseObject)
              // confirm that server was happy
              .then(assertable.assert)
              // print results
              .then((res) => {
                if (res.length !== 0) {
                  throw new Error(res.join('\n').toString());
                }
              })
          );

        describe('health endpoint', () => {
          const sendHealthRequest = (
            config: Assertable<'ConsumeHttpResponse'>['config']
          ) => api(config.baseUrl).health();
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
          beforeEach(async () => {
            context = await contract.setup(
              [state],
              willSendHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: httpStatus(['4XX', '5XX']) },
              })
            );
          });

          it('calls server health', () => {
            const client = api(context.config.baseUrl);

            return expect(client.health()).rejects.toBeInstanceOf(ApiError);
          });

          afterEach(async () => {
            const res = await context.assert();
            if (res.length !== 0) {
              throw new Error(
                res
                  .map((m) => m.toString())
                  .join('\n')
                  .toString()
              );
            }
          });
        });

        describe('specific server response', () => {
          beforeEach(async () => {
            context = await contract.setup(
              [state],
              willSendHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: 503, body: { status: 'down' } },
              })
            );
          });

          it('calls server health', async () => {
            const client = api(context.config.baseUrl);

            return expect(client.health()).rejects.toBeInstanceOf(ApiError);
          });

          afterEach(async () => {
            const res = await context.assert();
            if (res.length !== 0) {
              throw new Error(res.join('\n').toString());
            }
          });
        });
      });
    });

    describe('User', () => {
      describe('when the user exists', () => {
        const responseBody = { userId: stateVariable('userId') };
        beforeEach(async () => {
          context = await contract.setup(
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
            })
          );
        });

        it('returns an existing user', async () => {
          const client = api(context.config.baseUrl);
          expect(contract.stripMatchers(responseBody)).toEqual({
            userId: '123',
          });

          return expect(client.getUser('123')).resolves.toEqual(
            contract.stripMatchers(responseBody)
          );
        });

        afterEach(async () => {
          const res = await context.assert();
          if (res.length !== 0) {
            throw new Error(res.join('\n').toString());
          }
        });
      });
      describe("when the user doesn't exist", () => {
        beforeEach(async () => {
          context = await contract.setup(
            [inState('Server is up'), inState('No users exist')],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: stringPrefix('/users/', '123'),
              },
              response: {
                status: 404,
              },
            })
          );
        });

        it('returns a user not found error', async () => {
          const client = api(context.config.baseUrl);

          return expect(client.getUser('123')).rejects.toBeInstanceOf(
            UserNotFoundConsumerError
          );
        });

        afterEach(async () => {
          const res = await context.assert();
          if (res.length !== 0) {
            throw new Error(res.join('\n').toString());
          }
        });
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
        verify: () => Promise<void>
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
