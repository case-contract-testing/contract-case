import type * as http from 'http';
import type { MatchResult, Verifiable } from 'entities/types';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { makeNoErrorResult } from 'entities/results/MatchResult';
import type { InjectableContext } from 'entities/context/types';
import { anyString, httpStatus } from 'boundaries/dsl/Matchers';
import { CaseConfigurationError } from 'entities';
import { setup, startContract } from '.';
import start from './__tests__/server/http/index';

const expectErrorContaining = async (
  context: Verifiable<'ConsumeHttpResponse'>,
  expectedContent: string
) => {
  const matchResult: MatchResult = await context.verify();
  expect(matchResult).not.toHaveLength(0);
  expect(
    matchResult.map((m) => m.toString()).reduce((acc, m) => `${acc} ${m}`)
  ).toContain(expectedContent);
};

describe('simple get endpoint', () => {
  beforeAll(() =>
    startContract({
      consumerName: 'http request consumer',
      providerName: 'http request provider',
    })
  );
  const interaction = willSendHttpInteraction({
    request: {
      method: 'GET',
      path: '/health',
    },
    response: { status: 200, body: { status: 'up' } },
  });

  let context: Verifiable<'ConsumeHttpResponse'>;
  describe('without a URL', () => {
    it('fails to setup', () =>
      expect(
        setup([], interaction, {
          'case:currentRun:context:expectation': 'produce',
          'case:currentRun:context:logLevel': 'maintainerDebug',
        })
      ).rejects.toBeInstanceOf(CaseConfigurationError));
  });

  describe('with a URL', () => {
    const config: InjectableContext = {
      'case:currentRun:context:baseurl': 'http://localhost:8282',
      'case:currentRun:context:logLevel': 'maintainerDebug',
      'case:currentRun:context:expectation': 'produce',
    };
    describe('but no running server', () => {
      beforeEach(async () => {
        context = await setup([], interaction, {
          'case:currentRun:context:baseurl': 'http://localhost:8081',
          'case:currentRun:context:expectation': 'produce',
        });
      });

      it('fails to start', () =>
        expect(context.verify()).rejects.toBeInstanceOf(
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
          context = await setup([], interaction, config);
        });
        it('succeeds', () =>
          expect(context.verify()).resolves.toEqual(makeNoErrorResult()));
      });

      describe('and a matching interaction that is generic', () => {
        beforeEach(async () => {
          context = await setup(
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
          expect(context.verify()).resolves.toEqual(makeNoErrorResult()));
      });

      describe('and a non-matching body', () => {
        beforeEach(async () => {
          context = await setup(
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
          context = await setup(
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
          context = await setup(
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
          expect(context.verify()).resolves.not.toEqual(makeNoErrorResult()));
      });

      describe('and a non-matching path', () => {
        beforeEach(async () => {
          context = await setup(
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
          expect(context.verify()).resolves.not.toEqual(makeNoErrorResult()));
      });
    });
  });
});
