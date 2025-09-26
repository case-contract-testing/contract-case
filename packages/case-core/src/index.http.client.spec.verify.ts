import * as http from 'node:http';

import start from './__tests__/server/http/connectors/web';
import { baseService } from './__tests__/server/http/domain/baseService';
import { Dependencies } from './__tests__/server/http/domain/types';
import { User } from './__tests__/server/http/model/responses';
import { verifyContract } from './__tests__/jest/jest';
import { StateHandlers } from './entities/types';

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

  beforeAll(async () => {
    server = await start(port, serverDependencies);
  }, 30000);
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

      verifier
        .prepareVerificationTests({ stateHandlers })
        .forEach((verification) =>
          // eslint-disable-next-line jest/expect-expect
          it(`${verification.testName}`, () =>
            verifier.runPreparedTest(verification)),
        );
    },
  );
});
