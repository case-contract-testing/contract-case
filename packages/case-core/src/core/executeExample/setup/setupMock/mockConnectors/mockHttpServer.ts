import type * as http from 'http';
import express from 'express';
import type * as net from 'node:net';
import { CaseConfigurationError, CaseCoreError } from '../../../../../entities';
import { addLocation } from '../../../../../entities/context';
import type { MockData } from '../../../../../entities/nodes/types';
import {
  type HttpResponseData,
  type CoreHttpRequestResponseMatcherPair,
  type MatchContext,
  MOCK_HTTP_SERVER,
  type HttpRequestData,
} from '../../../../../entities/types';

const addressToString = (address: string | net.AddressInfo | null) => {
  if (typeof address === 'string') return address;
  if (address === null || address === undefined) return `${address}`;
  /*
  // This is no longer required after bumping axios version
  if (address.family === 'IPv6') {
    return `[${address.address === '::' ? '::' : address.address}]:${
      address.port
    }`;
  }  */
  return `${address.address === '::' ? 'localhost' : address.address}:${
    address.port
  }`;
};

const validateHttpResponseData = (
  maybeHttpResponseData: unknown,
): HttpResponseData => {
  if (
    maybeHttpResponseData === null ||
    typeof maybeHttpResponseData !== 'object'
  ) {
    throw new CaseConfigurationError(
      "Expected response description didn't resolve to a object",
    );
  }
  const data = maybeHttpResponseData as HttpResponseData;

  if (!('status' in data)) {
    throw new CaseConfigurationError(
      "Expected response description didn't contain a 'status' key",
    );
  }

  if (typeof data.status === 'string') {
    data.status = Number.parseInt(data.status, 10);
  }

  return data;
};

export const setupHttpResponseProducer = (
  {
    request: expectedRequest,
    response: responseMatcher,
  }: CoreHttpRequestResponseMatcherPair,
  context: MatchContext,
): Promise<MockData<typeof MOCK_HTTP_SERVER>> => {
  let requestData: HttpRequestData;
  let server: http.Server;

  return Promise.resolve()
    .then(() =>
      validateHttpResponseData(
        context.descendAndStrip(
          responseMatcher,
          addLocation('expectedRequest', context),
        ),
      ),
    )
    .then(
      (expectedResponse) =>
        new Promise<MockData<typeof MOCK_HTTP_SERVER>>((resolve, reject) => {
          const app = express();

          // TODO: Only do this if we need to
          app.use(express.json());

          app.all('*', (req, res, next) => {
            requestData = {
              method: req.method,
              path: req.path,
              body: req.body,
              query: req.query,
              headers: req.headers,
            };

            context.logger.debug(
              `Mock server at '${addressToString(server?.address())}' received`,
              requestData,
            );

            res.status(expectedResponse.status);

            if (expectedResponse.body) {
              context.logger.debug(
                `Sending HTTP ${expectedResponse.status} response to '${addressToString(server?.address())}', with body:`,
                expectedResponse.body,
              );
              res.send(expectedResponse.body);
            } else {
              context.logger.debug(
                `Sending empty HTTP ${expectedResponse.status} response to '${addressToString(server?.address())}'`,
              );
              res.send();
            }
            next();
          });

          server = app.listen();
          server.keepAliveTimeout = 0;
          const address = server.address();

          context.logger.maintainerDebug(
            `Mock server setup on address`,
            address,
          );
          context.logger.debug(
            `Mock server now listening on ${addressToString(address)}`,
          );

          if (address == null) {
            context.logger.error(
              `Server address was null or undefined. This shouldn't happen, and is a bug`,
            );
            reject(
              new CaseCoreError(
                'Server address was null after startup',
                context,
              ),
            );
            return;
          }
          const mock = {
            '_case:mock:type': MOCK_HTTP_SERVER,
            baseUrl: `http://${addressToString(address)}`,
            variables: context['_case:currentRun:context:variables'],
          };
          context.logger.maintainerDebug(
            `Mock listening and ready to accept ${
              typeof address === 'object' ? address.family : 'no-family'
            } connections: `,
            mock,
          );
          resolve({
            config: mock,
            assertableData: () =>
              new Promise<void>((startVerify, closeReject) => {
                context.logger.maintainerDebug(
                  `Closing server from ${mock.baseUrl}`,
                  mock,
                );
                server.close((err?: Error) => {
                  if (err) {
                    context.logger.error(
                      `There was an error shutting down the mock server. This shouldn't happen, and might be a bug`,
                    );
                    closeReject(
                      new CaseCoreError(
                        `The server at ${mock.baseUrl} was not running when it was asserted: ${err}`,
                      ),
                    );
                  } else {
                    context.logger.maintainerDebug(
                      `Server at ${mock.baseUrl} closed`,
                      mock,
                    );
                    startVerify();
                  }
                });
              }).then(async () => {
                context.logger.maintainerDebug(
                  `Asserting that the expected request for the mock at ${mock.baseUrl} happened correctly`,
                );

                return {
                  actual: requestData,
                  context: addLocation('request', context),
                  expected: expectedRequest,
                };
              }),
          });
        }),
    );
};
