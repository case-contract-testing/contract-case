import express from 'express';
import type * as http from 'http';
import type * as net from 'node:net';
import {
  addLocation,
  CaseConfigurationError,
  CaseCoreError,
  MatchContext,
  MockData,
} from '@contract-case/case-plugin-base';
import {
  HttpResponseData,
  CoreHttpRequestResponseMatcherPair,
  MOCK_HTTP_SERVER,
  HttpRequestData,
  AllHttpMockSetupInfo,
} from '@contract-case/case-core-plugin-http-dsl';

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
  context: MatchContext,
): HttpResponseData => {
  if (
    maybeHttpResponseData === null ||
    typeof maybeHttpResponseData !== 'object'
  ) {
    throw new CaseConfigurationError(
      "Expected response description didn't resolve to a object",
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  const data = maybeHttpResponseData as HttpResponseData;

  if (!('status' in data)) {
    throw new CaseConfigurationError(
      "Expected response description didn't contain a 'status' key",
      context,
      'BAD_INTERACTION_DEFINITION',
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
): Promise<MockData<AllHttpMockSetupInfo, typeof MOCK_HTTP_SERVER>> => {
  let requestData: HttpRequestData;
  let server: http.Server;

  return Promise.resolve()
    .then(() =>
      validateHttpResponseData(
        context.descendAndStrip(
          responseMatcher,
          addLocation('expectedRequest', context),
        ),
        addLocation('expectedRequest', context),
      ),
    )
    .then(
      (expectedResponse) =>
        new Promise<MockData<AllHttpMockSetupInfo, typeof MOCK_HTTP_SERVER>>(
          (resolve, reject) => {
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
            const setup = {
              '_case:mock:type': MOCK_HTTP_SERVER,

              stateVariables: context['_case:currentRun:context:variables'],
              functions: {},
              mock: { baseUrl: `http://${addressToString(address)}` },
            };
            context.logger.maintainerDebug(
              `Mock listening and ready to accept ${
                typeof address === 'object' ? address.family : 'no-family'
              } connections: `,
              setup,
            );
            resolve({
              config: setup,
              assertableData: () =>
                new Promise<void>((startVerify, closeReject) => {
                  context.logger.maintainerDebug(
                    `Closing server from ${setup.mock.baseUrl}, first politely:`,
                    setup,
                  );
                  server.close((err?: Error) => {
                    if (err) {
                      context.logger.error(
                        `There was an error shutting down the mock server. This shouldn't happen - errors here means that the server probably isn't started. Almost certainly there's a bug.`,
                      );
                      closeReject(
                        new CaseCoreError(
                          `The server at ${setup.mock.baseUrl} was not running when it was asserted: ${err}`,
                        ),
                      );
                    } else {
                      context.logger.maintainerDebug(
                        `Server at ${setup.mock.baseUrl} closed`,
                        setup,
                      );
                      startVerify();
                    }
                  });
                  context.logger.maintainerDebug(
                    `And also forcefully closing server from ${setup.mock.baseUrl}`,
                    setup,
                  );
                  server.closeAllConnections();
                }).then(async () => {
                  context.logger.maintainerDebug(
                    `Asserting that the expected request for the mock at ${setup.mock.baseUrl} happened correctly`,
                  );

                  return {
                    actual: requestData,
                    context: addLocation('request', context),
                    expected: expectedRequest,
                  };
                }),
            });
          },
        ),
    );
};
