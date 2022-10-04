import type { Verifiable } from 'entities/types';
import axios, { AxiosResponse } from 'axios';
import { httpStatus, shapedLike } from 'boundaries/dsl/Matchers';
import { httpInteraction } from 'entities/nodes/interactions/http';
import { setup } from '.';

const handleErrorResponse = <T>(response: AxiosResponse<T>) => {
  throw new Error(`${response.status}`);
};

const handleFailure = (error: Error) => {
  if (axios.isAxiosError(error) && error.response) {
    return handleErrorResponse(error.response);
  }

  throw new Error(`[API Failed] ${error.message}`);
};

const api = (baseUrl: string) => ({
  getHealth: () =>
    axios
      .get(`${baseUrl}/health`)
      .then((response) => response.data.status, handleFailure),
  /* other endpoints here */
});

describe('simple get endpoint', () => {
  let context: Verifiable<'SendHttpRequest'>;
  beforeEach(async () => {
    context = await setup(
      httpInteraction({
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

    const health = await client.getHealth();
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
  let context: Verifiable<'SendHttpRequest'>;
  beforeEach(async () => {
    context = await setup(
      httpInteraction({
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

    const health = await client.getHealth();
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
  let context: Verifiable<'SendHttpRequest'>;
  beforeEach(async () => {
    context = await setup(
      httpInteraction({
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

    return expect(client.getHealth()).rejects.toEqual(new Error('400'));
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
