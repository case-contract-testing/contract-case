/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable spaced-comment */
import * as fs from 'node:fs';
import {
  RunningService,
  start,
} from './__tests__/server/connectors/grpc/start.js';

// These imports are our code under test
import { makeApi } from './__tests__/client/connectors/grpc/clientExample.js';
import { baseService } from './__tests__/server/domain/baseService.js';
import { User } from './__tests__/server/entities/responses.js';
import { Dependencies } from './__tests__/server/domain/types.js';

// These imports are from ContractCase
// import { defineContract, inState, stateVariable } from './index.js';
// import { AnyMockDescriptor } from '@contract-case/case-definition-dsl/build/src/mocks/base/index.js';

// const contractDetails = {
//   consumerName: 'grpc response consumer',
//  providerName: 'grpc response provider',
// };

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/grpc-client-defined.case.json`;

// type GrpcConfig = {
//  port?: number;
// };

describe('e2e grpc consumer driven', () => {
  beforeAll(() => {
    // Delete the contract file first
    try {
      fs.rmSync(FILENAME);
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // We don't care if this fails
    }
  }, 30000);

  const mockHealthStatus = true;
  const mockGetUser: (id: string) => User | undefined = (id) => ({
    userId: id,
    name: 'John',
  });
  const serverDependencies: Dependencies = {
    healthService: {
      ready: () => mockHealthStatus,
    },
    baseService,
    userRepository: { get: (id) => mockGetUser(id) },
  };

  describe.skip('grpc client', () => {
    let runningService: RunningService;

    beforeAll(async () => {
      runningService = await start(serverDependencies);
    });

    afterAll(() => {
      runningService.server.forceShutdown();
    });

    // eslint-disable-next-line jest/expect-expect
    it('runs the server', () =>
      makeApi(runningService.port).getUser('some_id'));

    /*    defineContract(
      {
        ...contractDetails,
        // Usually you will not need to provide a filename
        contractFilename: FILENAME,
      },
      (contract) => {
        describe('User', () => {
          describe('With query variables', () => {
            /*      const sendUserRequest = (config: GrpcConfig) =>
              makeApi(config.port).getUser('some_id');
    describe('when the user exists', () => {
      //        const responseBody = { userId: stateVariable('userId') };
      /*     it('returns an existing user', async () =>
                contract.runInteraction(
                  {
                    states: [
                      inState('Server is up'),
                      inState('A user exists', { userId: '123' }),
                    ],
                    definition: willSendGrpcRequest({
                      request: {
                        methodName: 'GetUser',
                        payload: { id: stateVariable('userId') },
                      },
                      response: {
                        status: 'OK',
                        payload: responseBody,
                      },
                    }),
                  },
                  {
                    trigger: sendUserRequest,
                    testResponse: (user) => {
                      expect(contract.stripMatchers(responseBody)).toEqual({
                        userId: '123',
                      });
                      expect(user).toEqual(
                        contract.stripMatchers(responseBody),
                      );
                    },
                  },
                ));
            });
            /*
            describe("when the user doesn't exist", () => {
              it('returns a user not found error', () =>
                contract.runRejectingInteraction(
                  {
                    states: [
                      inState('Server is up'),
                      inState('No users exist', { userId: '123' }),
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
                  },
                  {
                    trigger: sendUserRequest,
                    testErrorResponse: (e) => {
                      expect(e).toBeInstanceOf(UserNotFoundConsumerError);
                    },
                  },
                )); 
            });
          });
        })
    });*/
  });
});
/*
function willSendGrpcRequest(arg0: {
  request: {
    methodName: string;
    payload: {
      id: import('@contract-case/case-entities-internal').CoreContextVariableMatcher;
    };
  };
  response: {
    status: string;
    payload: {
      userId: import('@contract-case/case-entities-internal').CoreContextVariableMatcher;
    };
  };
}): AnyMockDescriptor {
  throw new Error(`Function not implemented. ${arg0}`);
}
*/
