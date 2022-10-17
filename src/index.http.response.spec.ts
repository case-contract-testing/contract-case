import type * as http from 'http';
import type { MatchResult, Verifiable } from 'entities/types';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { makeNoErrorResult } from 'entities/results/MatchResult';
import type { RunContext } from 'entities/context/types';
import { anyString, httpStatus } from 'boundaries/dsl/Matchers';
import { CaseConfigurationError } from 'entities';
import { setup } from '.';
import start from './__tests__/server/http/index';

const expectErrorContaining = async (
  context: Verifiable<'ProduceHttpRequest'>,
  expectedContent: string
) => {
  const matchResult: MatchResult = await context.verify();
  expect(matchResult).not.toHaveLength(0);
  expect(
    matchResult.map((m) => m.toString()).reduce((acc, m) => `${acc} ${m}`)
  ).toContain(expectedContent);
};

describe('simple get endpoint', () => {
  const interaction = willSendHttpInteraction({
    request: {
      method: 'GET',
      path: '/health',
    },
    response: { status: 200, body: { status: 'up' } },
  });

  let context: Verifiable<'ProduceHttpRequest'>;
  describe('without a URL', () => {
    it('fails to setup', () =>
      expect(
        setup(interaction, { 'case:run:context:expectation': 'consume' })
      ).rejects.toBeInstanceOf(CaseConfigurationError));
  });

  describe('with a URL', () => {
    const config: RunContext = {
      'case:run:context:baseurl': 'http://localhost:8080',
      'case:run:context:expectation': 'consume',
    };
    describe('but no running server', () => {
      beforeEach(async () => {
        context = await setup(interaction, {
          'case:run:context:baseurl': 'http://localhost:8081',
          'case:run:context:expectation': 'consume',
        });
      });

      it('fails to start', () =>
        expect(context.verify()).rejects.toBeInstanceOf(
          CaseConfigurationError
        ));
    });
    describe('with a running server', () => {
      let server: http.Server;
      beforeEach(async () => {
        server = start();
      });
      afterEach(
        () =>
          new Promise<void>((resolve, reject) => {
            server.close((err?: Error) => {
              if (err) reject(err);
              resolve();
            });
          })
      );

      describe('and a matching interaction', () => {
        beforeEach(async () => {
          context = await setup(interaction, config);
        });
        it('succeeds', () =>
          expect(context.verify()).resolves.toEqual(makeNoErrorResult()));
      });

      describe('and a matching interaction that is generic', () => {
        beforeEach(async () => {
          context = await setup(
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
            "'up' (string) is not exactly equal to 'down' (string)"
          ));
      });

      describe('and a non-matching status', () => {
        beforeEach(async () => {
          context = await setup(
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
            "The returned http status code '200' did not match"
          ));
      });
      describe('and a non-matching method', () => {
        beforeEach(async () => {
          context = await setup(
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
