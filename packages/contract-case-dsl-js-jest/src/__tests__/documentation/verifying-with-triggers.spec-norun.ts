/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */


import { verifyContract } from '../../boundaries/jest/jest.js';
import { YourApi } from './YourApi.js';

// example-extract _verify-trigger-groups
import {
  HttpRequestConfig,
  TriggerGroupMap,
} from '@contract-case/contract-case-jest';

// ignore-extract
class ApiError extends Error {}

const api = (baseUrl: string) => new YourApi(baseUrl);

describe('Contract verification with triggers', () => {
  // end-ignore
  verifyContract({
    providerName: 'http request provider',

    triggers: new TriggerGroupMap().addTriggerGroup(
      'an http "GET" request to "/health" without a body',
      {
        trigger: (setup: HttpRequestConfig) => api(setup.mock.baseUrl).health(),
        testResponses: {
          'a (200) response with body an object shaped like {status: "up"}': (
            health,
          ) => {
            expect(health).toEqual('up');
          },
        },
        testErrorResponses: {
          'a (httpStatus 4XX | 5XX) response without a body': (e) => {
            expect(e).toBeInstanceOf(ApiError);
          },
        },
      },
    ),
  });
  // end-example
});

describe('Contract verification with state variables', () => {
  verifyContract({
    providerName: 'http request provider',

    triggers: new TriggerGroupMap()
      // example-extract _verify-trigger-state-variables
      .addTriggerGroup(
        'an http "GET" request to "/users/{{userId}}" without a body',
        {
          trigger: (setup: HttpRequestConfig) =>
            api(setup.mock.baseUrl).getUser(setup.getStateVariable('userId')),
          testResponses: {
            'a (200) response with body an object shaped like {userId: {{userId}}}':
              (user, setup) => {
                expect(user).toEqual({
                  userId: setup.getStateVariable('userId'),
                });
              },
          },
        },
      ),
    // end-example
  });
});
