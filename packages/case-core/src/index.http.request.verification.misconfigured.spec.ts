import type * as http from 'node:http';

import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import { Mutex } from 'async-mutex';
import type { RunTestCallback } from './core/executeExample/types';
import type { StateHandlers } from './entities/states/types';

import start from './__tests__/server/http/connectors/web';
import { baseService } from './__tests__/server/http/domain/baseService';
import type { User } from './__tests__/server/http/model/responses';
import type { Dependencies } from './__tests__/server/http/domain/types';

import { ReadingCaseContract } from './core';
import { readerDependencies } from './connectors/dependencies';
import { readContract } from './connectors/contractStore/contractReader';
import { defaultPrinter } from './__tests__/jest/defaultTestPrinter';

describe('Server verification', () => {
  let server: http.Server;
  let mockHealthStatus = true;
  let mockGetUser: (id: string) => User | undefined = () => undefined;
  const port = 8089;
  const serverDependencies: Dependencies = {
    healthService: {
      ready: () => mockHealthStatus,
    },
    baseService,
    userRepository: { get: (id) => mockGetUser(id) },
  };

  const contract = readContract(
    'case-contracts/contract-for-incorrectly-configured-examples.json',
  );

  const verifier = new ReadingCaseContract(
    contract,
    readerDependencies(defaultPrinter),
    {
      mockConfig: {
        http: {
          baseUrlUnderTest: `http://localhost:${port}`,
        },
      },
      logLevel: 'none',
      printResults: false,
      publish: false,
    },
    ['tests'],
    new Mutex(),
  );
  beforeAll(async () => {
    server = await start(port, serverDependencies);
  });
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

  describe('with a file contract', () => {
    // JEST BOILERPLATE
    const runJestTestExpectingErrors =
      (errors: Record<string, Function>): RunTestCallback =>
      (testName: string, verify: () => Promise<unknown>): void => {
        it(
          `${testName}`,
          () =>
            verify().then(
              () => {
                if (errors[testName] !== undefined) {
                  throw new Error(
                    `Expected to throw a ${errors[testName]?.name}, but it didn't`,
                  );
                }
              },
              (e) => {
                if (errors[testName] !== undefined) {
                  // eslint-disable-next-line jest/no-conditional-expect
                  expect(e).toBeInstanceOf(errors[testName]);
                } else {
                  throw e;
                }
              },
            ),
          60000,
        );
      };

    // END JEST BOILERPLATE

    describe('contract verification missing a state', () => {
      const stateHandlers: StateHandlers = {
        'Server is up': () => {
          mockHealthStatus = true;
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
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({
          'When Server is down, then an http "GET" request to "/health" without a body returns a (httpStatus 4XX | 5XX) response without a body':
            CaseConfigurationError,
          'When Server is down, then an http "GET" request to "/health" without a body returns a (503) response with body an object shaped like {status: "down"}':
            CaseConfigurationError,
        }),
      );
    });

    describe('contract verification with state that fails', () => {
      const stateHandlers: StateHandlers = {
        'Server is up': () => {
          throw new Error('OH NO');
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
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({
          'When Server is up, then an http "GET" request to "/health" without a body with the following headers an object shaped like {accept: "application/json"} returns a (200) response with body an object shaped like {status: "up"}':
            CaseConfigurationError,
          'When Server is up, then an http "GET" request to "/health" without a body returns a (200) response with body an object shaped like {status: <any string>}':
            CaseConfigurationError,
          [`When Server is up and A user exists, then an http "GET" request to "/users/\${userId}" without a body returns a (200) response with body an object shaped like {userId: \${userId}}`]:
            CaseConfigurationError,
          'When Server is up and No users exist, then an http "GET" request to "/users/123" without a body returns a (404) response without a body':
            CaseConfigurationError,
        }),
      );
    });

    describe('contract verification with state teardown that fails', () => {
      const stateHandlers: StateHandlers = {
        'Server is up': {
          setup: () => {
            mockHealthStatus = true;
          },
          teardown: () => {
            throw new Error('OH NO TEARDOWN');
          },
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
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({
          'When Server is up, then an http "GET" request to "/health" without a body with the following headers an object shaped like {accept: "application/json"} returns a (200) response with body an object shaped like {status: "up"}':
            CaseConfigurationError,
          'When Server is up, then an http "GET" request to "/health" without a body returns a (200) response with body an object shaped like {status: <any string>}':
            CaseConfigurationError,
          [`When Server is up and A user exists, then an http "GET" request to "/users/\${userId}" without a body returns a (200) response with body an object shaped like {userId: \${userId}}`]:
            CaseConfigurationError,
          'When Server is up and No users exist, then an http "GET" request to "/users/123" without a body returns a (404) response without a body':
            CaseConfigurationError,
        }),
      );
    });

    describe('contract verification missing a variable', () => {
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
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({
          [`When Server is up and A user exists, then an http "GET" request to "/users/\${userId}" without a body returns a (200) response with body an object shaped like {userId: \${userId}}`]:
            CaseConfigurationError,
        }),
      );
    });

    describe('contract verification with the wrong type of a variable', () => {
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
            return { userId: 42 };
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({
          [`When Server is up and A user exists, then an http "GET" request to "/users/\${userId}" without a body returns a (200) response with body an object shaped like {userId: \${userId}}`]:
            CaseConfigurationError,
        }),
      );
    });

    describe('contract verification with unexpected variables', () => {
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
            return { userId: '42' };
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
          return { userId: 12 };
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({}),
      );
    });

    describe('contract verification with empty variables', () => {
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
            return {};
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
          return { userId: 12 };
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({
          [`When Server is up and A user exists, then an http "GET" request to "/users/\${userId}" without a body returns a (200) response with body an object shaped like {userId: \${userId}}`]:
            CaseConfigurationError,
        }),
      );
    });

    describe('contract verification with more variables than expected', () => {
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
            return { userId, extra: 'oh no' };
          },
          teardown: () => {
            mockGetUser = () => undefined;
          },
        },
        'No users exist': () => {
          mockGetUser = () => undefined;
          return { userId: 12 };
        },
      };
      verifier.verifyContract(
        { stateHandlers },
        runJestTestExpectingErrors({}),
      );
    });
  });
});
