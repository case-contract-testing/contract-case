import type * as http from 'http';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import type { Assertable, MatchResult } from 'entities/types';
import { makeNoErrorResult } from 'entities/results';
import { anyString, httpStatus } from 'boundaries/dsl/Matchers';
import type { CaseConfig } from 'connectors/contract/core/types';
import { CaseConfigurationError } from 'entities';
import { CaseFailedError } from 'entities/CaseFailedError';
import { CaseContract } from 'boundaries';

import start from './__tests__/server/http/index';

const expectErrorContaining = async (
  context: Assertable<'ConsumeHttpResponse'>,
  expectedContent: string
) => {
  await context.assert().then(
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

  const interaction = willSendHttpInteraction({
    request: {
      method: 'GET',
      path: '/health',
    },
    response: { status: 200, body: { status: 'up' } },
  });

  let context: Assertable<'ConsumeHttpResponse'>;
  describe('without a URL', () => {
    it('fails to setup', () =>
      expect(
        contract.setup([], interaction, {
          expectation: 'produce',
        } as CaseConfig)
      ).rejects.toBeInstanceOf(CaseConfigurationError));
  });

  describe('with a URL', () => {
    const config: CaseConfig & { expectation: 'produce' } = {
      baseUrlUnderTest: 'http://localhost:8282',
      expectation: 'produce',
    };
    describe('but no running server', () => {
      beforeEach(async () => {
        context = await contract.setup([], interaction, {
          ...config,
          baseUrlUnderTest: 'http://localhost:8081',
        });
      });

      it('fails to start', () =>
        expect(context.assert()).rejects.toBeInstanceOf(
          CaseConfigurationError
        ));
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
        beforeEach(async () => {
          context = await contract.setup([], interaction, config);
        });
        it('succeeds', () =>
          expect(context.assert()).resolves.toEqual(makeNoErrorResult()));
      });

      describe('and a matching interaction that is generic', () => {
        beforeEach(async () => {
          context = await contract.setup(
            [],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: '/health',
              },
              response: {
                status: httpStatus(200),
                body: { status: anyString('up') },
              },
            }),
            config
          );
        });
        it('succeeds', () =>
          expect(context.assert()).resolves.toEqual(makeNoErrorResult()));
      });

      describe('and a non-matching body', () => {
        beforeEach(async () => {
          context = await contract.setup(
            [],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: '/health',
              },
              response: { status: 200, body: { status: 'down' } },
            }),
            config
          );
        });
        it('fails', () =>
          expectErrorContaining(
            context,
            '"up" (string) is not exactly equal to "down" (string)'
          ));
      });

      describe('and a non-matching status', () => {
        beforeEach(async () => {
          context = await contract.setup(
            [],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: '/health',
              },
              response: { status: httpStatus([400]), body: { status: 'up' } },
            }),
            config
          );
        });
        it('fails', () =>
          expectErrorContaining(
            context,
            'The returned http status code (200) did not match'
          ));
      });
      describe('and a non-matching method', () => {
        beforeEach(async () => {
          context = await contract.setup(
            [],
            willSendHttpInteraction({
              request: {
                method: 'POST',
                path: '/health',
              },
              response: { status: httpStatus('200'), body: { status: 'up' } },
            }),
            config
          );
        });
        it('fails', () =>
          expect(context.assert()).rejects.not.toEqual(makeNoErrorResult()));
      });

      describe('and a non-matching path', () => {
        beforeEach(async () => {
          context = await contract.setup(
            [],
            willSendHttpInteraction({
              request: {
                method: 'GET',
                path: '/healthy',
              },
              response: { status: httpStatus(200), body: { status: 'up' } },
            }),
            config
          );
        });
        it('fails', () =>
          expect(context.assert()).rejects.not.toEqual(makeNoErrorResult()));
      });
    });
  });
});
