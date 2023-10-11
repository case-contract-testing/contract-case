import api from './__tests__/client/http/connector';
import { UserNotFoundConsumerError } from './__tests__/client/http/connector/errors';
import { ApiError } from './__tests__/client/http/connector/internals/apiErrors';

import { verifyContract, HttpRequestConfig } from '.';
import { TriggerGroupMap } from './connectors/TriggerGroup';

verifyContract(
  {
    providerName: 'http request provider',
    printResults: false,
  },
  (verifier) => {
    verifier.runVerification({
      triggers: new TriggerGroupMap()
        .addTriggerGroup('an http "GET" request to "/health" without a body', {
          trigger: (config: HttpRequestConfig) => api(config.baseUrl).health(),
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
        })
        .addTriggerGroup(
          'an http "GET" request to "/health" with the following headers an object shaped like {accept: "application/json"} without a body',
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).health(),
            testResponses: {
              'a (200) response with body an object shaped like {status: "up"}':
                (health) => {
                  expect(health).toEqual('up');
                },
            },
          },
        )
        .addTriggerGroup(
          'an http "GET" request to "/users"?id={{userId}} without a body',
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).getUserByQuery(
                (config.variables['userId'] as string) || '123',
              ),
            testResponses: {
              'a (200) response with body an object shaped like {userId: {{userId}}}':
                (user, config) => {
                  expect(user).toEqual({
                    userId: config.variables['userId'],
                  });
                },
            },
            testErrorResponses: {
              'a (404) response without a body': (e) => {
                expect(e).toBeInstanceOf(UserNotFoundConsumerError);
              },
            },
          },
        )
        .addTriggerGroup(
          'an http "GET" request to "/users/123" without a body',
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).getUserByPath('123'),
            testErrorResponses: {
              'a (404) response without a body': (e) => {
                expect(e).toBeInstanceOf(UserNotFoundConsumerError);
              },
            },
          },
        )
        .addTriggerGroup(
          'an http "GET" request to "/users/{{userId}}" without a body',
          {
            trigger: (config: HttpRequestConfig) =>
              api(config.baseUrl).getUserByPath(
                config.variables['userId'] as string,
              ),
            testResponses: {
              'a (200) response with body an object shaped like {userId: {{userId}}}':
                (user, config) => {
                  expect(user).toEqual({
                    userId: config.variables['userId'],
                  });
                },
            },
            testErrorResponses: {
              'a (404) response without a body': (e) => {
                expect(e).toBeInstanceOf(UserNotFoundConsumerError);
              },
            },
          },
        ),
    });
  },
);
