import api from './__tests__/client/http.js';
import { UserNotFoundConsumerError } from './__tests__/client/entities/errors.js';
import { ApiError } from './__tests__/client/entities/apiErrors.js';

import { verifyContract, HttpRequestConfig } from './index.js';
import { TriggerGroupMap } from './connectors/TriggerGroup.js';

verifyContract({
  providerName: 'http request provider',

  triggers: new TriggerGroupMap()
    .addTriggerGroup('an http "GET" request to "/health" without a body', {
      trigger: (setup: HttpRequestConfig) => api(setup.mock.baseUrl).health(),
      testResponses: {
        'returns a (200) response with body an object shaped like {status: <any string>}':
          (health) => expect(typeof health).toBe('string'),
        'a (200) response with body an object shaped like {status: <any string>}':
          (health) => expect(typeof health).toBe('string'),
      },
      testErrorResponses: {
        'returns a (httpStatus 4XX | 5XX) response without a body': (e) => {
          expect(e).toBeInstanceOf(ApiError);
        },
        'returns a (503) response with body an object shaped like {status: "down"}':
          (e) => {
            expect(e).toBeInstanceOf(ApiError);
          },
        'a (httpStatus 4XX | 5XX) response without a body': (e) => {
          expect(e).toBeInstanceOf(ApiError);
        },
        'a (503) response with body an object shaped like {status: "down"}': (
          e,
        ) => {
          expect(e).toBeInstanceOf(ApiError);
        },
      },
    })
    .addTriggerGroup(
      'an http "GET" request to "/health" with the following headers an object shaped like {accept: "application/json"} without a body',
      {
        trigger: (config: HttpRequestConfig) =>
          api(config.mock.baseUrl).health(),
        testResponses: {
          'returns a (200) response with body an object shaped like {status: "up"}':
            (health) => {
              expect(health).toEqual('up');
            },
          'a (200) response with body an object shaped like {status: "up"}': (
            health,
          ) => {
            expect(health).toEqual('up');
          },
        },
      },
    )
    .addTriggerGroup(
      'an http "GET" request to "/users"?id={{userId}} without a body',
      {
        trigger: (setup: HttpRequestConfig) =>
          api(setup.mock.baseUrl).getUserByQuery(
            setup.getStateVariable('userId'),
          ),
        testResponses: {
          'returns a (200) response with body an object shaped like {userId: {{userId}}}':
            (user, setup) => {
              expect(user).toEqual({
                userId: setup.getStateVariable('userId'),
              });
            },
          'a (200) response with body an object shaped like {userId: {{userId}}}':
            (user, setup) => {
              expect(user).toEqual({
                userId: setup.getStateVariable('userId'),
              });
            },
        },
        testErrorResponses: {
          'returns a (404) response without a body': (e) => {
            expect(e).toBeInstanceOf(UserNotFoundConsumerError);
          },
          'a (404) response without a body': (e) => {
            expect(e).toBeInstanceOf(UserNotFoundConsumerError);
          },
        },
      },
    )
    .addTriggerGroup('an http "GET" request to "/users/123" without a body', {
      trigger: (config: HttpRequestConfig) =>
        api(config.mock.baseUrl).getUserByPath('123'),
      testErrorResponses: {
        'returns a (404) response without a body': (e) => {
          expect(e).toBeInstanceOf(UserNotFoundConsumerError);
        },
        'a (404) response without a body': (e) => {
          expect(e).toBeInstanceOf(UserNotFoundConsumerError);
        },
      },
    })
    .addTriggerGroup(
      'an http "GET" request to "/users/{{userId}}" without a body',
      {
        trigger: (setup: HttpRequestConfig) =>
          api(setup.mock.baseUrl).getUserByPath(
            setup.getStateVariable('userId'),
          ),
        testResponses: {
          'returns a (200) response with body an object shaped like {userId: {{userId}}}':
            (user, setup) => {
              expect(user).toEqual({
                userId: setup.getStateVariable('userId'),
              });
            },
          'a (200) response with body an object shaped like {userId: {{userId}}}':
            (user, setup) => {
              expect(user).toEqual({
                userId: setup.getStateVariable('userId'),
              });
            },
        },
        testErrorResponses: {
          'returns a (404) response without a body': (e) => {
            expect(e).toBeInstanceOf(UserNotFoundConsumerError);
          },
          'a (404) response without a body': (e) => {
            expect(e).toBeInstanceOf(UserNotFoundConsumerError);
          },
        },
      },
    ),
});
