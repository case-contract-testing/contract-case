// These imports are our code under test
import {
  HttpRequestConsumerSetup,
  willSendHttpRequest,
} from '@contract-case/case-core-plugin-http-dsl';
import api from './__tests__/client/http/connector';

// This import is our Jest DSL
import { defineContractNoTeardown } from './__tests__/jest/jest';

// These imports are from Case
import { CaseConfigurationError, inState } from '.';

describe('With an existing contract', () => {
  defineContractNoTeardown(
    {
      consumerName: 'http response consumer',
      providerName: 'http response provider',
      config: {
        printResults: false, // Set this to true for you own tests
      },
    },
    (contract) => {
      const sendHealthRequest = (config: HttpRequestConsumerSetup) =>
        api(config.mock['baseUrl']).health();
      const state = inState('Server is up');

      describe('Contract writing', () => {
        it('Fails if the contract would change', async () => {
          await contract.runInteraction({
            states: [state],
            definition: willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/health',
                headers: { accept: 'application/json' },
              },
              response: { status: 200, body: { status: 'up' } },
            }),
            trigger: sendHealthRequest,
            testResponse: (health) => {
              expect(health).toEqual('up');
            },
          });

          await expect(contract.endRecord()).rejects.toThrow(
            CaseConfigurationError,
          );
        });
      });
    },
  );
});

describe('With no prior contract', () => {
  defineContractNoTeardown(
    {
      consumerName: 'DONT CREATE THIS',
      providerName: 'ALSO DOESNT EXIST',
      config: {
        printResults: false, // Set this to true for you own tests
      },
    },
    (contract) => {
      const sendHealthRequest = (config: HttpRequestConsumerSetup) =>
        api(config.mock['baseUrl']).health();
      const state = inState('Server is up');

      describe('Contract writing', () => {
        it('Fails if the contract would change', async () => {
          await contract.runInteraction({
            states: [state],
            definition: willSendHttpRequest({
              request: {
                method: 'GET',
                path: '/health',
                headers: { accept: 'application/json' },
              },
              response: { status: 200, body: { status: 'up' } },
            }),
            trigger: sendHealthRequest,
            testResponse: (health) => {
              expect(health).toEqual('up');
            },
          });

          await expect(contract.endRecord()).rejects.toThrow(
            CaseConfigurationError,
          );
        });
      });
    },
  );
});
