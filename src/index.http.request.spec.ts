import * as fs from 'fs';
import api from '__tests__/client/http/connector';
import { ApiError } from '__tests__/client/http/connector/internals/apiErrors';
import type { Verifiable } from 'entities/types';
import { httpStatus, shapedLike } from 'boundaries/dsl/Matchers';
import { willSendHttpInteraction } from 'entities/nodes/interactions/http';
import { endContract } from 'boundaries/dsl/contract';
import { setup, startContract } from '.';

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
    beforeEach(async () => {
      context = await setup(
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
  describe('arbitrary server response', () => {
    beforeEach(async () => {
      context = await setup(
        willSendHttpInteraction({
          request: {
            method: 'GET',
            path: '/health',
          },
          response: { status: 200, body: shapedLike({ status: 'down' }) },
        })
      );
    });

    it('calls server health', async () => {
      const client = api(context.mock.baseUrl);

      const health = await client.health();
      expect(health).toEqual('down');
    });

    afterEach(async () => {
      const res = await context.verify();
      if (res.length !== 0) {
        throw new Error(res.join('\n').toString());
      }
    });
  });

  describe('No body server response', () => {
    beforeEach(async () => {
      context = await setup(
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
});
