import { Server, ServerCredentials } from '@grpc/grpc-js';
import getPort from 'get-port';

import service from './proto/contract_case_stream_grpc_pb';

import { contractDefinition } from './contractDefinition';
import { contractVerification } from './contractVerification';
import { versionString } from '../../versionString';

/**
 * Starts a gRPC server for defining and verifying ContractCase contracts
 */
export function main(): void {
  const server = new Server();

  getPort().then((freePort) => {
    server.bindAsync(
      `0.0.0.0:${freePort}`,
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error != null) {
          // Console used here because there's nothing sensible we can do with this error
          // eslint-disable-next-line no-console
          console.error(`[${versionString}]`, `Unable to start: ${error}`);
        } else {
          // This is needed to communicate with clients
          // Must have the port number after the `:`
          // eslint-disable-next-line no-console
          console.log('[SERVER]', `Started on port: ${port}`);
        }
      },
    );

    server.addService(service.ContractCaseService, {
      contractDefinition,
      contractVerification,
    });
  });
}
