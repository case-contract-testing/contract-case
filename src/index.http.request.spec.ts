import * as fs from 'fs';
import type * as http from 'http';
import api from '__tests__/client/http/connector';
import { ApiError } from '__tests__/client/http/connector/internals/apiErrors';
import type { Dependencies } from '__tests__/server/http/domain/types';
import { baseService } from '__tests__/server/http/domain/baseService';
import type { Assertable } from 'entities/types';
import { httpStatus, shapedLike } from 'boundaries/dsl/Matchers';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { endContract } from 'boundaries/dsl/contract';
import { readContract } from 'connectors/contract/writer/fileSystem';
import start from '__tests__/server/http/connectors/web';

import type { RunTestCallback, StateFunctions } from 'boundaries/dsl/types';
import { verifyContract } from 'boundaries/verify';
import { inState, setup, startContract } from '.';

const contractDetails = {
  consumerName: 'http response consumer',
  providerName: 'http response provider',
};

describe('e2e http consumer driven', () => {
  beforeAll(() => {
    try {
      fs.rmSync('temp-contracts', { recursive: true });
    } catch (e) {
      // We don't care if this fails
    }
    fs.mkdirSync('temp-contracts');
  });
  describe('test and write contract', () => {
    beforeAll(() => startContract(contractDetails, {}));

    afterAll(() => endContract({}));
    let context: Assertable<'ConsumeHttpResponse'>;
    describe('health get', () => {
      describe('When the server is up', () => {
        const state = inState('Server is up');
        describe('specific server response', () => {
          beforeEach(async () => {
            context = await setup(
              [state],
              willSendHttpInteraction({
                request: {
                  method: 'GET',
                  path: '/health',
                },
                response: { status: 200, body: { status: 'up' } },
              })
            );
          });

          it('calls server health', async () => {
            const client = api(context.mock.baseUrl);

            const health = await client.health();
            expect(health).toEqual('up');
          });

          afterEach(async () => {
            const res = await context.assert();
            if (res.length !== 0) {
              throw new Error(res.join('\n').toString());
            }
          });
        });
        describe('arbitrary status response string', () => {
          beforeEach(async () => {
            context = await setup(
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
              })
            );
          });

          it('calls server health', async () => {
            const client = api(context.mock.baseUrl);

            const health = await client.health();
            expect(health).toEqual('whatever');
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
    describe('When the server is down', () => {
      const state = inState('Server is down');
      describe('No body server response', () => {
        beforeEach(async () => {
          context = await setup(
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
          const client = api(context.mock.baseUrl);

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
          context = await setup(
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
          const client = api(context.mock.baseUrl);

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
  describe('Server verification', () => {
    let server: http.Server;
    let mockHealthStatus = true;
    const port = 8087;
    const serverDependencies: Dependencies = {
      healthService: {
        ready: () => mockHealthStatus,
      },
      baseService,
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

    const stateSetups: StateFunctions = {
      'Server is up': () => {
        mockHealthStatus = true;
      },
      'Server is down': () => {
        mockHealthStatus = false;
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
        verifyContract(
          readContract(
            'temp-contracts/http-response-consumer-http-response-provider-12.case.json'
          ),
          stateSetups,
          runJestTest,
          { baseUrlUnderTest: `http://localhost:${port}` }
        );
      });
    });
  });
});
