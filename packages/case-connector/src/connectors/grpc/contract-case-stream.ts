import { Server, ServerCredentials } from '@grpc/grpc-js';
import { ContractCaseService } from '@contract-case/case-connector-proto';
import getPort from 'get-port';

import { contractDefinition } from './contractDefinition.js';
import { contractVerification } from './contractVerification.js';
import { versionString } from '../../versionString.js';
import { maintainerLog } from '../../domain/maintainerLog.js';

type ServerInfo = { port: string; address: string };

const bind = (
  server: Server,
  host: string,
  freePort: number,
): Promise<ServerInfo> =>
  new Promise((resolve, reject) => {
    const address = `${host}:${freePort}`;
    maintainerLog(`Attempting to bind server: ${address}`);
    server.bindAsync(
      address,
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error != null) {
          reject(error);
        } else {
          resolve({ port: `${port}`, address });
        }
      },
    );
  });

/**
 * Starts a gRPC server for defining and verifying ContractCase contracts
 */
export function main(): void {
  maintainerLog(`Starting ContractCase connector @ ${versionString}`);
  const server = new Server();

  getPort().then((freePort) => {
    server.addService(ContractCaseService, {
      contractDefinition,
      contractVerification,
    });

    return bind(server, '[::1]', freePort)
      .catch((error) => {
        maintainerLog('Server bind failed with error: ', error);
        return bind(server, '127.0.0.1', freePort);
      })
      .then(
        ({ port, address }) => {
          maintainerLog(`Successfully started server at ${address}`);
          // This is needed to communicate with clients
          // Must have the port number after the `:`
          // eslint-disable-next-line no-console
          console.log('[SERVER]', `Started on port: ${port}`);
        },
        (error) => {
          // Console used here because there's nothing sensible we can do with this error
          // eslint-disable-next-line no-console
          console.error(
            `[${versionString}]`,
            `ContractCase's internal server was unable to start: ${error}`,
          );
          process.exit(1);
        },
      );
  });
}
