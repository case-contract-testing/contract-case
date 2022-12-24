import * as fs from 'fs';
import api from '__tests__/client/http/connector';
import { ApiError } from '__tests__/client/http/connector/internals/apiErrors';
import type { Verifiable } from 'entities/types';
import { httpStatus, shapedLike } from 'boundaries/dsl/Matchers';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { endContract } from 'boundaries/dsl/contract';
import { inState, setup, startContract } from '.';

describe('example http response consumer contract', () => {
  beforeAll(() => {
    fs.rmSync('temp-contracts', { recursive: true });
    fs.mkdirSync('temp-contracts');
    return startContract({
      consumerName: 'http response consumer',
      providerName: 'http response provider',
    });
  });

  afterAll(() => endContract());
  let context: Verifiable<'ConsumeHttpResponse'>;
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
          const res = await context.verify();
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
          const res = await context.verify();
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
        const res = await context.verify();
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
        const res = await context.verify();
        if (res.length !== 0) {
          throw new Error(res.join('\n').toString());
        }
      });
    });
  });
});
