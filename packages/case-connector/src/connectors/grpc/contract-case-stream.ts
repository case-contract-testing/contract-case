import { Server, ServerCredentials } from '@grpc/grpc-js';

import service from './proto/contract_case_stream_grpc_pb';

import { maintainerLog } from '../../domain/maintainerLog';
import { contractDefinition } from './contractDefinition';

const PORT = 50200;

/**
 * Starts a gRPC server for defining and verifying ContractCase contracts
 */
export function main(): void {
  const server = new Server();

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    ServerCredentials.createInsecure(),
    (error, port) => {
      if (error != null) {
        maintainerLog('[SERVER]', `Unable to start: ${error}`);
      } else {
        maintainerLog('[SERVER]', `Started on port: ${port}`);
        server.start();
      }
    },
  );

  server.addService(service.ContractCaseService, {
    contractDefinition,
  });
}
