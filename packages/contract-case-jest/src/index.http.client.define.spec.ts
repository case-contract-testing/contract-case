import * as fs from 'node:fs';
// These imports are our code under test
import api from './__tests__/client/http/connector/index.js';
import { ApiError } from './__tests__/client/http/connector/internals/apiErrors.js';
import { UserNotFoundConsumerError } from './__tests__/client/http/connector/errors.js';

// These imports are from Case
import {
  inState,
  httpStatus,
  shapedLike,
  stateVariable,
  stringPrefix,
  willSendHttpRequest,
  HttpRequestConfig,
  defineContract,
  anyString,
} from './index.js';

const contractDetails = {
  consumerName: 'http response consumer',
  providerName: 'http response provider',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/http-response-consumer-http-response-provider-12.case.json`;

describe('e2e http consumer driven', () => {
  beforeAll(() => {
    // Delete the contract file first
    try {
      fs.rmSync(FILENAME);
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // We don't care if this fails
    }
  }, 30000);
  defineContract(
    {
      ...contractDetails,
      // Usually you will not need to provide a filename
      contractFilename: FILENAME,
    },
    (contract) => {
      describe('health get', () => {
        const sendHealthRequest = (config: HttpRequestConfig) =>
          api(config.mock.baseUrl).health();
        describe('When the server is up', () => {
          const state = inState('Server is up');

          describe('health endpoint', () => {
            it('behaves as expected', () =>
              contract.runExample(
                {
                  states: [state],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                      headers: { accept: 'application/json' },
                    },
                    response: { status: 200, body: { status: 'up' } },
                  }),
                },
                {
                  trigger: sendHealthRequest,

                  testResponse: (health) => {
                    expect(health).toEqual('up');
                  },
                },
              ));

            describe('arbitrary status response string', () => {
              it('behaves as expected', () =>
                contract.runExample(
                  {
                    states: [state],
                    definition: willSendHttpRequest({
                      request: {
                        method: 'GET',
                        path: '/health',
                      },
                      response: {
                        status: 200,
                        body: shapedLike({ status: 'whatever' }),
                      },
                    }),
                  },
                  {
                    trigger: sendHealthRequest,
                    testResponse: (health) => {
                      expect(health).toEqual('whatever');
                    },
                  },
                ));
            });
          });
        });
        describe('When the server is down', () => {
          const state = inState('Server is down');
          describe('No body server response', () => {
            it('calls server health', () =>
              contract.runRejectingExample(
                {
                  states: [state],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                    },
                    response: { status: httpStatus(['4XX', '5XX']) },
                  }),
                },
                {
                  trigger: sendHealthRequest,
                  testErrorResponse: (e) => {
                    expect(e).toBeInstanceOf(ApiError);
                  },
                },
              ));
          });

          describe('specific server response', () => {
            it('calls server health', async () =>
              contract.runRejectingExample(
                {
                  states: [state],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/health',
                    },
                    response: { status: 503, body: { status: 'down' } },
                  }),
                },
                {
                  trigger: sendHealthRequest,
                  testErrorResponse: (e) => {
                    expect(e).toBeInstanceOf(ApiError);
                  },
                },
              ));
          });
        });
      });
      describe('User', () => {
        describe('With query variables', () => {
          const sendUserRequest = (setup: HttpRequestConfig) =>
            api(setup.mock.baseUrl).getUserByQuery(
              setup.getStateVariable('userId'),
            );
          describe('when the user exists', () => {
            const responseBody = { userId: stateVariable('userId') };

            it('returns an existing user', async () =>
              contract.runExample(
                {
                  states: [
                    inState('Server is up'),
                    inState('A user exists', { userId: '123' }),
                  ],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/users',
                      query: { id: stateVariable('userId') },
                    },
                    response: {
                      status: 200,
                      body: responseBody,
                    },
                  }),
                },
                {
                  trigger: sendUserRequest,
                  testResponse: (user) => {
                    expect(contract.stripMatchers(responseBody)).toEqual({
                      userId: '123',
                    });
                    expect(user).toEqual(contract.stripMatchers(responseBody));
                  },
                },
              ));
          });
          describe("when the user doesn't exist", () => {
            it('returns a user not found error', () =>
              contract.runRejectingExample(
                {
                  states: [
                    inState('Server is up'),
                    inState('No users exist', { userId: '123' }),
                  ],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: '/users',
                      query: { id: stateVariable('userId') },
                    },
                    response: {
                      status: 404,
                    },
                  }),
                },
                {
                  trigger: sendUserRequest,
                  testErrorResponse: (e) => {
                    expect(e).toBeInstanceOf(UserNotFoundConsumerError);
                  },
                },
              ));
          });
        });
        describe('With path variables', () => {
          const sendUserRequest = (setup: HttpRequestConfig) =>
            api(setup.mock.baseUrl).getUserByPath(
              setup.getStateVariable('userId'),
            );
          describe('when the user exists', () => {
            const responseBody = {
              userId: stateVariable('userId'),
              name: anyString('john smith'),
            };

            it('returns an existing user', async () =>
              contract.runExample(
                {
                  states: [
                    inState('Server is up'),
                    inState('A user exists', { userId: '123' }),
                  ],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: stringPrefix('/users/', stateVariable('userId')),
                    },
                    response: {
                      status: 200,
                      body: responseBody,
                    },
                  }),
                },
                {
                  trigger: sendUserRequest,
                  testResponse: (user) => {
                    expect(contract.stripMatchers(responseBody)).toEqual({
                      name: 'john smith',
                      userId: '123',
                    });
                    expect(user).toEqual(contract.stripMatchers(responseBody));
                  },
                },
              ));
          });
          describe("when the user doesn't exist", () => {
            it('returns a user not found error', () =>
              contract.runRejectingExample(
                {
                  states: [
                    inState('Server is up'),
                    inState('No users exist', { userId: '123' }),
                  ],
                  definition: willSendHttpRequest({
                    request: {
                      method: 'GET',
                      path: stringPrefix('/users/', stateVariable('userId')),
                    },
                    response: {
                      status: 404,
                    },
                  }),
                },
                {
                  trigger: sendUserRequest,
                  testErrorResponse: (e) => {
                    expect(e).toBeInstanceOf(UserNotFoundConsumerError);
                  },
                },
              ));
          });
        });
      });
    },
  );
});
