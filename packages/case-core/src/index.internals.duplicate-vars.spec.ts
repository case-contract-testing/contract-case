// These imports are our code under test
import {
  HttpRequestConsumerSetup,
  willSendHttpRequest,
} from '@contract-case/case-core-plugin-http-dsl';
import api from './__tests__/client/http/connector';
import { UserNotFoundConsumerError } from './__tests__/client/http/connector/errors';

// This import is our Jest DSL
import { defineContract } from './__tests__/jest/jest';

// These imports are from Case
import { inState, stateVariable } from '.';

const contractDetails = {
  consumerName: 'http response consumer internal test',
  providerName: 'http response provider internal test',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/internal-variable-tests.case.json`;

describe('e2e http consumer driven', () => {
  defineContract(
    {
      ...contractDetails,
      config: {
        printResults: false, // Set this to true for you own tests
        contractFilename: FILENAME, // Usually you will not need to provide a filename
        //       changedContracts: 'OVERWRITE',
        publish: false,
      },
    },
    (contract) => {
      describe('User', () => {
        describe('With query variables', () => {
          const sendUserRequest = (config: HttpRequestConsumerSetup) =>
            api(config.mock['baseUrl']).getUserByQuery(
              config.stateVariables['userId'] as string,
            );
          describe('when the user exists', () => {
            const responseBody = { userId: stateVariable('userId') };

            it('returns an existing user', async () =>
              contract.runInteraction({
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
                trigger: sendUserRequest,
                testResponse: (user) => {
                  expect(contract.stripMatchers(responseBody)).toEqual({
                    userId: '123',
                  });
                  expect(user).toEqual(contract.stripMatchers(responseBody));
                },
              }));
          });
          describe("when the user doesn't exist", () => {
            it('returns a user not found error', () =>
              contract.runRejectingInteraction({
                states: [
                  inState('Server is up'),
                  inState('No users exist', { userId: '321' }),
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
                trigger: sendUserRequest,
                testErrorResponse: (e) => {
                  expect(e).toBeInstanceOf(UserNotFoundConsumerError);
                },
              }));
          });
        });
      });
    },
  );
});
