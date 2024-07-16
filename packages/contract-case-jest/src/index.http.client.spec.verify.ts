import * as http from 'node:http';

import start from './__tests__/server/http/connectors/web/index.js';
import { baseService } from './__tests__/server/http/domain/baseService.js';
import { Dependencies } from './__tests__/server/http/domain/types.js';
import { User } from './__tests__/server/http/model/responses.js';
import { verifyContract } from './boundaries/jest/jest.js';
import { StateHandlers } from './entities/types.js';

describe('Server verification', () => {
  // SERVER SETUP BOILERPLATE
  // REPLACE WITH YOUR OWN SETUP CODE
  let server: http.Server;
  let mockHealthStatus = true;
  let mockGetUser: (id: string) => User | undefined = () => undefined;
  const port = 8087;
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
      baseUrlUnderTest: `http://localhost:${port}`, // Replace this with your own server URL
      printResults: false, // Remove this / set to true if you are copying this example
    },
    (verifier) => {
      const stateHandlers: StateHandlers = {
        'Server is up': () => {
          mockHealthStatus = true;
        },
        'Server is down': () => {
          mockHealthStatus = false;
        },
        'A user exists': {
          setup: () => {
            const userId = '42';
            mockGetUser = (id) => {
              if (id === userId)
                return {
                  userId,
                  name: 'John',
                };
              return undefined;
            };
            return { userId };
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
          return { userId: '12' };
        },
      };

      verifier.runVerification({ stateHandlers });
    },
  );
});
