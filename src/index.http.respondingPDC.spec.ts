/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';
import type * as http from 'node:http';

import type { AnyInteractionType, CaseInteractionFor } from 'entities/types';
import {
  httpStatus,
  shapedLike,
  stateVariable,
  stringPrefix,
} from 'boundaries/dsl/Matchers';
import { willReceiveHttpInteraction } from 'entities/nodes/interactions/http';
import type { AnyState, StateFunctions } from 'entities/states/types';

import start from '__tests__/server/http/connectors/web';
import type { User } from '__tests__/server/http/model/responses';

import type { Dependencies } from '__tests__/server/http/domain/types';
import { baseService } from '__tests__/server/http/domain/baseService';

import { inState, CaseContract } from '.';

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

    const stateHandlers: StateFunctions = {
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
    const testInteraction = <T extends AnyInteractionType>(
      states: Array<AnyState>,
      interaction: CaseInteractionFor<T>
    ) =>
      contract.executeTest({
        states,
        interaction,
        stateHandlers,
      });

    const testFailedInteraction = <T extends AnyInteractionType>(
      states: Array<AnyState>,
      interaction: CaseInteractionFor<T>
    ) =>
      contract.executeTest({
        states,
        interaction,
        stateHandlers,
      });

    // END JEST BOILERPLATE

    describe('health get', () => {
      describe('When the server is up', () => {
        const state = inState('Server is up');

        describe('health endpoint', () => {
          it('behaves as expected', () =>
            testInteraction(
              [state],
              willReceiveHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: 200, body: { status: 'up' } },
              })
            ));

          describe('arbitrary status response string', () => {
            it('behaves as expected', () =>
              testInteraction(
                [state],
                willReceiveHttpInteraction({
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
            testFailedInteraction(
              [state],
              willReceiveHttpInteraction({
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
            testFailedInteraction(
              [state],
              willReceiveHttpInteraction({
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
          testInteraction(
            [
              inState('Server is up'),
              inState('A user exists', { userId: '123' }),
            ],
            willReceiveHttpInteraction({
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
          testFailedInteraction(
            [inState('Server is up'), inState('No users exist')],
            willReceiveHttpInteraction({
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

// eslint-disable-next-line jest/no-commented-out-tests
/*
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
    const verifier = new CaseVerifier(readContract(FILENAME), {
      baseUrlUnderTest: `http://localhost:${port}`,
      printResults: false,
    });
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

*/
