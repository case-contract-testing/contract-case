import { credentials } from '@grpc/grpc-js';

import { loadService } from '../../../fixtures/grpcLoader.js';
import {
  PACKAGE_NAME,
  PROTO_PATH,
  SERVICE_NAME,
} from '../../../fixtures/grpcConstants.js';
import { ApiError } from '../../entities/apiErrors.js';

export const USER_ID = 'SOME_ID';

export const apiCall = (port: number): Promise<unknown> =>
  Promise.resolve().then(() => {
    const target = `localhost:${port}`;

    const serviceName = SERVICE_NAME;
    const methodName = 'getUser';

    const ExampleService = loadService(PROTO_PATH, PACKAGE_NAME, serviceName);

    const client = new ExampleService(target, credentials.createInsecure());

    return new Promise((resolve, reject) => {
      if (!client[methodName]) {
        reject(
          new Error(
            `The service named '${serviceName}' doesn't appear to have a method named '${methodName}'`,
          ),
        );
        return;
      }

      client[methodName]({ id: USER_ID }, (err: Error, response: unknown) => {
        if (err) {
          reject(new ApiError(`Server failed with: ${err}`));
          return;
        }
        // eslint-disable-next-line no-console
        console.log('User:', response);
        resolve(response);
      });
    });
  });
