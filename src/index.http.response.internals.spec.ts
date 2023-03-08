import type * as http from 'http';
import { willSendHttpRequest } from './entities/nodes/mocks/http';
import type { MatchResult } from './entities/types';
import { makeNoErrorResult } from './entities/results';
import { anyString, httpStatus, logLevel } from './boundaries/dsl/Matchers';
import type { CaseConfig } from './core/types';
import { CaseConfigurationError, CaseFailedAssertionError } from './entities';
import { CaseContract } from './boundaries';

import start from './__tests__/server/http/index';
import { makeBrokerApi } from './connectors/contract/broker';
import { writeContract } from './connectors/contract/writer';
import { makeLogger } from './connectors/logger';
import { resultPrinter } from './connectors/resultPrinter';

const expectErrorContaining = async (
  context: Promise<unknown>,
  expectedContent: string
) => {
  await context.then(
    () => {
      throw new Error(
        "This unit test expected a failure, but there wasn't one"
      );
    },
    (e) => {
      expect(e).toBeInstanceOf(CaseFailedAssertionError);
      expect(e.matchResult).not.toHaveLength(0);
      expect(
        (e.matchResult as MatchResult)
          .map((m) => m.toString())
          .reduce((acc, m) => `${acc} ${m}`)
      ).toContain(expectedContent);
    }
  );
};

describe('simple get endpoint', () => {
  const contract = new CaseContract(
    {
      consumerName: 'http request consumer',
      providerName: 'http request provider',
    },
    resultPrinter,
    makeLogger,
    makeBrokerApi,
    writeContract,
    {
      testRunId: 'REQUEST',
      printResults: false,
      logLevel: 'error',
    }
  );

  const mock = willSendHttpRequest({
    request: {
      method: 'GET',
      path: '/health',
    },
    response: { status: 200, body: { status: 'up' } },
  });

  describe('without a URL', () => {
    const config = {
      contractMode: 'read',
      logLevel: 'error',
    } as CaseConfig;

    it('fails to setup', () =>
      expect(
        contract.executeTest(
          {
            mockDescription: mock,
          },
          config
        )
      ).rejects.toBeInstanceOf(CaseConfigurationError));
  });

  describe('with a URL', () => {
    const config: CaseConfig & {
      contractMode: 'read';
    } = {
      baseUrlUnderTest: 'http://localhost:8282',
      contractMode: 'read',
      logLevel: 'error',
    };
    describe('but no running server', () => {
      it('fails to start', () =>
        expect(
          contract.executeTest(
            {
              mockDescription: mock,
            },
            {
              ...config,
              baseUrlUnderTest: 'http://localhost:8081',
            }
          )
        ).rejects.toBeInstanceOf(CaseConfigurationError));
    });
    describe('with a running server', () => {
      let server: http.Server;
      beforeAll(async () => {
        server = await start();
      });
      afterAll(() => {
        const closePromise = new Promise<void>((resolve) => {
          server.on('close', () => {
            resolve();
          });
        });
        server.close();
        return closePromise;
      });

      describe('and a matching mock', () => {
        it('succeeds', () =>
          expect(
            contract.executeTest(
              {
                mockDescription: mock,
              },
              config
            )
          ).resolves.toBe(undefined));
      });

      describe('and a matching mock that is generic', () => {
        it('succeeds', () =>
          expect(
            contract.executeTest(
              {
                mockDescription: willSendHttpRequest({
                  request: {
                    method: 'GET',
                    path: '/health',
                  },
                  response: {
                    status: httpStatus(200),
                    body: logLevel('maintainerDebug', {
                      status: anyString('up'),
                    }),
                  },
                }),
              },
              config
            )
          ).resolves.toBe(undefined));
      });

      describe('and a matching mock with the same status as a previous one, but a string', () => {
        it('succeeds', () =>
          expect(
            contract.executeTest(
              {
                mockDescription: willSendHttpRequest({
                  request: {
                    method: 'GET',
                    path: '/health',
                  },
                  response: {
                    status: httpStatus('200'),
                    body: logLevel('maintainerDebug', {
                      status: anyString('up'),
                    }),
                  },
                }),
              },
              config
            )
          ).resolves.toBe(undefined));
      });

      describe('and a non-matching body', () => {
        beforeEach(async () => {});
        it('fails', () =>
          expectErrorContaining(
            Promise.resolve().then(() =>
              contract.executeTest(
                {
                  mockDescription: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                    },
                    response: { status: 200, body: { status: 'down' } },
                  }),
                },
                config
              )
            ),
            '"up" (string) is not exactly equal to "down" (string)'
          ));
      });

      describe('and a non-matching status', () => {
        it('fails', () =>
          expectErrorContaining(
            Promise.resolve().then(() =>
              contract.executeTest(
                {
                  mockDescription: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                    },
                    response: {
                      status: httpStatus([400]),
                      body: { status: 'up' },
                    },
                  }),
                },
                config
              )
            ),
            'The returned http status code (200) did not match'
          ));
      });
      describe('and a non-matching method', () => {
        it('fails', () =>
          expect(
            Promise.resolve().then(() =>
              contract.executeTest(
                {
                  mockDescription: willSendHttpRequest({
                    request: {
                      method: 'POST',
                      path: '/health',
                    },
                    response: {
                      status: httpStatus(200),
                      body: { status: 'up' },
                    },
                  }),
                },
                config
              )
            )
          ).rejects.not.toEqual(makeNoErrorResult()));
      });

      describe('and a non-matching path', () => {
        it('fails', () =>
          expect(
            Promise.resolve().then(() =>
              contract.executeTest(
                {
                  mockDescription: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/healthy',
                    },
                    response: {
                      status: httpStatus(200),
                      body: { status: 'up' },
                    },
                  }),
                },
                config
              )
            )
          ).rejects.not.toEqual(makeNoErrorResult()));
      });
    });
  });
});
