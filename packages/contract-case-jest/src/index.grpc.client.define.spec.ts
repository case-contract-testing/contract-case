import * as fs from 'node:fs';
import {
  RunningService,
  start,
} from './__tests__/server/connectors/grpc/main.js';
import { apiCall } from './__tests__/client/connectors/grpc/clientExample.js';
import { baseService } from './__tests__/server/domain/baseService.js';
import { User } from './__tests__/server/entities/responses.js';
import { Dependencies } from './__tests__/server/domain/types.js';
// These imports are our code under test
/* 
const contractDetails = {
  consumerName: 'grpc response consumer',
  providerName: 'grpc response provider',
};
*/

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/grpc-client-defined.case.json`;

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

  describe('grpc client', () => {
    let runningService: RunningService;

    beforeAll(async () => {
      runningService = await start(serverDependencies);
    });

    afterAll(() => {
      runningService.server.forceShutdown();
    });

    // eslint-disable-next-line jest/expect-expect
    it('runs the server', () => apiCall(runningService.port));
  });
});
