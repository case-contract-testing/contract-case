import type * as http from 'http';
import { willSendHttpRequest } from 'entities/nodes/mocks/http';
import type { MatchResult } from 'entities/types';
import { makeNoErrorResult } from 'entities/results';
import { anyString, httpStatus, logLevel } from 'boundaries/dsl/Matchers';
import type { CaseConfig } from 'connectors/contract/core/types';
import { CaseConfigurationError } from 'entities';
import { CaseFailedError } from 'entities/CaseFailedError';
import { CaseContract } from 'boundaries';

import start from './__tests__/server/http/index';

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
      expect(e).toBeInstanceOf(CaseFailedError);
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
    {
      testRunId: 'REQUEST',
      printResults: false,
    }
  );

  const interaction = willSendHttpRequest({
    request: {
      method: 'GET',
      path: '/health',
    },
    response: { status: 200, body: { status: 'up' } },
  });

  describe('without a URL', () => {
    const config = {
      expectation: 'produce',
      contractMode: 'read',
    } as CaseConfig;

    it('fails to setup', () =>
      expect(
        contract.executeTest(
          {
            interaction,
          },
          config
        )
      ).rejects.toBeInstanceOf(CaseConfigurationError));
  });

  describe('with a URL', () => {
    const config: CaseConfig & {
      expectation: 'produce';
      contractMode: 'read';
    } = {
      baseUrlUnderTest: 'http://localhost:8282',
      expectation: 'produce',
      contractMode: 'read',
    };
    describe('but no running server', () => {
      it('fails to start', () =>
        expect(
          contract.executeTest(
            {
              interaction,
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

      describe('and a matching interaction', () => {
        it('succeeds', () =>
          expect(
            contract.executeTest(
              {
                interaction,
              },
              config
            )
          ).resolves.toBe(undefined));
      });

      describe('and a matching interaction that is generic', () => {
        it('succeeds', () =>
          expect(
            contract.executeTest(
              {
                interaction: willSendHttpRequest({
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

      describe('and a matching interaction with the same status as a previous one, but a string', () => {
        it('succeeds', () =>
          expect(
            contract.executeTest(
              {
                interaction: willSendHttpRequest({
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
                  interaction: willSendHttpRequest({
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
                  interaction: willSendHttpRequest({
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
                  interaction: willSendHttpRequest({
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
                  interaction: willSendHttpRequest({
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
