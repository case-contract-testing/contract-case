import {
  ProtobufTypeDefinition,
  Server,
  ServerCredentials,
} from '@grpc/grpc-js';
import { format } from 'pretty-format';

import {
  PACKAGE_NAME,
  PROTO_PATH,
  SERVICE_NAME,
} from '../../../fixtures/grpcConstants.js';
import {
  loadPackage,
  loadServiceFromPackage,
} from '../../../fixtures/grpcLoader.js';
import { createServer } from './createServer.js';
import { GetUser } from './handlers.js';
import { Dependencies } from '../../domain/types.js';

export type RunningService = { port: number; server: Server };

export const start = (deps: Dependencies): Promise<RunningService> => {
  const grpcPackage = loadPackage(PROTO_PATH, PACKAGE_NAME);

  const ExampleService = loadServiceFromPackage(SERVICE_NAME, grpcPackage);

  const userResponse = grpcPackage['UserResponse'] as ProtobufTypeDefinition;
  // eslint-disable-next-line no-console
  console.log(format(userResponse.type));
  // eslint-disable-next-line no-console
  console.log(ExampleService);

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
