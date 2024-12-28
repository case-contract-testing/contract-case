import { Server, ServerCredentials } from '@grpc/grpc-js';

import {
  PACKAGE_NAME,
  PROTO_PATH,
  SERVICE_NAME,
} from '../../../fixtures/grpcConstants.js';
import { loadService } from '../../../fixtures/grpcLoader.js';
import { createServer } from './createServer.js';
import { GetUser } from './handlers.js';
import { Dependencies } from '../../domain/types.js';

export type RunningService = { port: number; server: Server };

export const start = (deps: Dependencies): Promise<RunningService> => {
  const ExampleService = loadService(PROTO_PATH, PACKAGE_NAME, SERVICE_NAME);

  const server = createServer(ExampleService.service, {
    GetUser: GetUser(deps),
  });

  return new Promise((resolve, reject) => {
    server.bindAsync(
      '0.0.0.0',
      ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          reject(err);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Server started on port: ${port}`);
          resolve({ port, server });
        }
      },
    );
  });
};
