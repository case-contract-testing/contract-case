import * as http from 'node:http';

import start from '../server/connectors/http/index.js';
import { baseService } from '../server/domain/baseService.js';
import { Dependencies } from '../server/domain/types.js';
import { User } from '../server/entities/responses.js';
import { verifyContract } from '../../boundaries/jest/jest.js';

describe('Server verification', () => {
  // SERVER SETUP BOILERPLATE
  // REPLACE WITH YOUR OWN SETUP CODE
  let server: http.Server;
  const mockHealthStatus = true;
  const mockGetUser: (id: string) => User | undefined = () => undefined;
  const port = 8091;
  const serverDependencies: Dependencies = {
    healthService: {
      ready: () => mockHealthStatus,
    },
    baseService,
    userRepository: { get: (id) => mockGetUser(id) },
  };

  beforeAll(
    async () => {
      server = await start(port, serverDependencies);
    },
    // Long timeout to reduce brittleness in windows tests in github
    60000,
  );
  afterAll(
    () =>
      new Promise<void>((resolve, reject) => {
        if (server) {
          server.close((err?: Error) => {
            if (err) reject(err);
            resolve();
          });
        } else {
          resolve();
        }
      }),
  );
  // END SERVER SETUP BOILERPLATE

  verifyContract(
    {
      providerName: 'http response provider',
      mockConfig: {
        http: {
          baseUrlUnderTest: `http://localhost:${port}`, // Replace this with your own server URL
        },
      },
    },
    (verifier) =>
      // example-extract _verifying-state-handlers
      verifier.runVerification({
        stateHandlers: {
          // State handlers are keyed by the name of the state.
          // This must match exactly between the name defined in the
          // contract, and the state handler at verification time.

          // A state handler either returns void, or variables.
          //
          // It generally has the type:
          //  {
          //    setup:    () => Promise<void> | void
          //    teardown: () => Promise | void
          //  }
          //
          // If you only need a setup handler, you can use:
          //
          //   () => Promise<void> | void
          //
          // instead.
          //
          // If your state returns variables, return an object where the
          // keys are the variable names instead of void.
          'Server is up': () => {
            // Any setup for the state 'Server is up' goes here
          },
          'A user exists': {
            setup: () => {
              // Any setup for the state 'A user exists' goes here
            },
            teardown: () => {
              // Any teardown for the state 'A user exists' goes here
            },
          },
        },
      }),
    // end-example
  );
});
