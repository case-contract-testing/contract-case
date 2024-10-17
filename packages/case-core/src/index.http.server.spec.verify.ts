/* eslint-disable @typescript-eslint/dot-notation */
import { HttpRequestConfig } from '.';
import api from './__tests__/client/http/connector';
import { UserNotFoundConsumerError } from './__tests__/client/http/connector/errors';
import { ApiError } from './__tests__/client/http/connector/internals/apiErrors';
import { verifyContract } from './__tests__/jest/jest';

verifyContract(
  {
    providerName: 'http request provider',
    printResults: false,
  },
  (verifier) => {
    verifier.verifyContract({
      triggers: {
        'an http "GET" request to "/health" without a body': {
          trigger: (setup: HttpRequestConfig) =>
            api(setup.mock['baseUrl']).health(),
          testResponses: {
            'a (200) response with body an object shaped like {status: "up"}': (
              health,
            ) => {
              expect(health).toEqual('up');
            },
            'a (200) response with body an object shaped like {status: <any string>}':
              (health) => expect(typeof health).toBe('string'),
          },
          testErrorResponses: {
            'a (httpStatus 4XX | 5XX) response without a body': (e) => {
              expect(e).toBeInstanceOf(ApiError);
            },
            'a (503) response with body an object shaped like {status: "down"}':
              (e) => {
                expect(e).toBeInstanceOf(ApiError);
              },
          },
        },
        'an http "GET" request to "/health" with the following headers an object shaped like {accept: "application/json"} without a body':
          {
            trigger: (setup: HttpRequestConfig) =>
              api(setup.mock['baseUrl']).health(),
            testResponses: {
              'a (200) response with body an object shaped like {status: "up"}':
                (health) => {
                  expect(health).toEqual('up');
                },
            },
          },
        'an http "GET" request to "/users"?id={{userId}} without a body': {
          trigger: (setup: HttpRequestConfig) =>
            api(setup.mock['baseUrl']).getUserByQuery(
              (setup.stateVariables['userId'] as string) || '123',
            ),
          testResponses: {
            'a (200) response with body an object shaped like {userId: {{userId}}}':
              (user, setup) => {
                expect(user).toEqual({
                  userId: setup.stateVariables['userId'],
                });
              },
          },
          testErrorResponses: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
        'an http "GET" request to "/users/123" without a body': {
          trigger: (setup: HttpRequestConfig) =>
            api(setup.mock['baseUrl']).getUserByPath('123'),
          testErrorResponses: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
        'an http "GET" request to "/users/{{userId}}" without a body': {
          trigger: (setup: HttpRequestConfig) =>
            api(setup.mock['baseUrl']).getUserByPath(
              setup.stateVariables['userId'] as string,
            ),
          testResponses: {
            'a (200) response with body an object shaped like {userId: {{userId}}}':
              (user, setup) => {
                expect(user).toEqual({
                  userId: setup.stateVariables['userId'],
                });
              },
          },
          testErrorResponses: {
            'a (404) response without a body': (e) => {
              expect(e).toBeInstanceOf(UserNotFoundConsumerError);
            },
          },
        },
      },
    });
  },
);
