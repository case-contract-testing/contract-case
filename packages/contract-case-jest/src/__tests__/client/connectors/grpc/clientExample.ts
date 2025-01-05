import { credentials, ServerErrorResponse, status } from '@grpc/grpc-js';

import {
  loadPackage,
  loadServiceFromPackage,
} from '../../../fixtures/grpcLoader.js';
import {
  PACKAGE_NAME,
  PROTO_PATH,
  SERVICE_NAME,
} from '../../../fixtures/grpcConstants.js';
import { ApiError } from '../../entities/apiErrors.js';
import { UserNotFoundConsumerError } from '../../entities/errors.js';
import { createTypeLookup } from '../../../fixtures/grpcTypeResolver.js';
import { User } from '../../../server/entities/responses.js';

export type GrpcApi = {
  getUser: (id: string) => Promise<User>;
};

export const makeApi = (port: number): GrpcApi => {
  const target = `localhost:${port}`;

  const serviceName = SERVICE_NAME;
  const methodName = 'getUser';

  const ExampleService = loadServiceFromPackage(
    SERVICE_NAME,
    loadPackage(PROTO_PATH, PACKAGE_NAME),
  );

  const client = new ExampleService(target, credentials.createInsecure());

  return {
    getUser: (id: string) =>
      new Promise((resolve, reject) => {
        if (!client[methodName]) {
          reject(
            new Error(
              `The service named '${serviceName}' doesn't appear to have a method named '${methodName}'`,
            ),
          );
          return;
        }

        const typeLookup = createTypeLookup(PROTO_PATH);

        const UserRequest = typeLookup.lookup('grpc_endpoints.GetUserRequest');

        const StringValue = typeLookup.lookup('google.protobuf.StringValue');

        client[methodName](
          UserRequest.create({
            id: StringValue.create({ value: id }),
          }),
          (err: ServerErrorResponse, response: unknown) => {
            if (err) {
              if (err.code === status.NOT_FOUND) {
                reject(
                  new UserNotFoundConsumerError(
                    `The user '${id}' was not found`,
                  ),
                );
              } else {
                reject(new ApiError(`Server failed with: ${err}`));
              }
              return;
            }
            // eslint-disable-next-line no-console
            console.log('User:', response);
            resolve(response as User);
          },
        );
      }),
  };
};
