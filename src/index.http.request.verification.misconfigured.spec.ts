/* eslint-disable @typescript-eslint/ban-types */
import type * as http from 'node:http';

import { readContract } from 'connectors/contract/writer/fileSystem';
import type { RunTestCallback } from 'connectors/contract/types';
import type { StateFunctions } from 'entities/states/types';

import start from '__tests__/server/http/connectors/web';
import { baseService } from '__tests__/server/http/domain/baseService';
import type { User } from '__tests__/server/http/model/responses';
import { CaseConfigurationError } from 'entities';
import type { Dependencies } from '__tests__/server/http/domain/types';

import { CaseVerifier } from '.';

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
    'case-contracts/http-response-consumer-http-response-provider-12.case.json'
  );

  const verifier = new CaseVerifier(contract, {
    baseUrlUnderTest: `http://localhost:${port}`,
    logLevel: 'none',
    printResults: false,
  });
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
      })
  );

  describe('with a file contract', () => {
    // JEST BOILERPLATE
    const runJestTestExepectingErrors =
      (errors: Record<string, Function>): RunTestCallback =>
      (testName: string, verify: () => Promise<void>): void => {
        // eslint-disable-next-line jest/expect-expect
        it(`${testName}`, () =>
          verify().then(
            () => {
              if (errors[testName] !== undefined) {
                throw new Error(
                  `Expected to throw a ${errors[testName]?.name}, but it didn't`
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
            }
          ));
      };

    // END JEST BOILERPLATE

    describe('contract verification missing a state', () => {
      const stateSetups: StateFunctions = {
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
        stateSetups,
        runJestTestExepectingErrors({
          "When Server is down, then Interaction 3's request responds with Interaction 3's response":
            CaseConfigurationError,
          "When Server is down, then Interaction 2's request responds with Interaction 2's response":
            CaseConfigurationError,
        })
      );
    });

    describe('contract verification with state that fails', () => {
      const stateSetups: StateFunctions = {
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
        stateSetups,
        runJestTestExepectingErrors({
          "When Server is up, then Interaction 1's request responds with Interaction 1's response":
            CaseConfigurationError,
          "When Server is up and No users exist, then Interaction 5's request responds with Interaction 5's response":
            CaseConfigurationError,
          "When Server is up, then Interaction 0's request responds with Interaction 0's response":
            CaseConfigurationError,
          "When Server is up and A user exists, then Interaction 4's request responds with Interaction 4's response":
            CaseConfigurationError,
        })
      );
    });

    describe('contract verification with state teardown that fails', () => {
      const stateSetups: StateFunctions = {
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
        stateSetups,
        runJestTestExepectingErrors({
          "When Server is up, then Interaction 1's request responds with Interaction 1's response":
            CaseConfigurationError,
          "When Server is up and No users exist, then Interaction 5's request responds with Interaction 5's response":
            CaseConfigurationError,
          "When Server is up, then Interaction 0's request responds with Interaction 0's response":
            CaseConfigurationError,
          "When Server is up and A user exists, then Interaction 4's request responds with Interaction 4's response":
            CaseConfigurationError,
        })
      );
    });

    describe('contract verification missing a variable', () => {
      const stateSetups: StateFunctions = {
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
        stateSetups,
        runJestTestExepectingErrors({
          "When Server is up and A user exists, then Interaction 4's request responds with Interaction 4's response":
            CaseConfigurationError,
        })
      );
    });

    describe('contract verification with the wrong type of a variable', () => {
      const stateSetups: StateFunctions = {
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
        stateSetups,
        runJestTestExepectingErrors({
          "When Server is up and A user exists, then Interaction 4's request responds with Interaction 4's response":
            CaseConfigurationError,
        })
      );
    });

    describe('contract verification with unexpected variables', () => {
      const stateSetups: StateFunctions = {
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
      verifier.verifyContract(stateSetups, runJestTestExepectingErrors({}));
    });

    describe('contract verification with empty variables', () => {
      const stateSetups: StateFunctions = {
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
        stateSetups,
        runJestTestExepectingErrors({
          "When Server is up and A user exists, then Interaction 4's request responds with Interaction 4's response":
            CaseConfigurationError,
        })
      );
    });

    describe('contract verification with more variables than expected', () => {
      const stateSetups: StateFunctions = {
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
      verifier.verifyContract(stateSetups, runJestTestExepectingErrors({}));
    });
  });
});
