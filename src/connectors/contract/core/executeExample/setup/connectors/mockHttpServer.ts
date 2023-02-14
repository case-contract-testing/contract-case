import type * as http from 'http';
import express from 'express';
import type * as net from 'node:net';

import {
  HttpRequestData,
  CoreHttpRequestResponseMatcherPair,
  MatchContext,
  MOCK_HTTP_SERVER,
  HTTP_RESPONSE_MATCHER_TYPE,
  CoreHttpResponseMatcher,
  LookupableMatcher,
} from 'entities/types';
import { addLocation } from 'entities/context';
import { CaseConfigurationError, CaseCoreError } from 'entities';
import type { MockData } from 'entities/nodes/mocks/setup.types';

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

// TODO this really shouldn't be here
const getMatcher = (
  matcher: LookupableMatcher | CoreHttpResponseMatcher,
  matchContext: MatchContext
): CoreHttpResponseMatcher => {
  if (matcher['case:matcher:type'] === HTTP_RESPONSE_MATCHER_TYPE) {
    return matcher;
  }
  if ('case:matcher:child' in matcher) {
    matchContext.saveLookupableMatcher(matcher);
  }
  const stored = matchContext.lookupMatcher(matcher['case:matcher:uniqueName']);
  if (
    typeof stored === 'object' &&
    stored != null &&
    'case:matcher:type' in stored &&
    stored['case:matcher:type'] === HTTP_RESPONSE_MATCHER_TYPE
  ) {
    return stored;
  }
  throw new CaseConfigurationError(
    `The HTTP matcher didn't resolve to an ${HTTP_RESPONSE_MATCHER_TYPE}`,
    matchContext
  );
};

export const setupHttpResponseProducer = (
  {
    request: expectedRequest,
    response: responseMatcher,
  }: CoreHttpRequestResponseMatcherPair,
  context: MatchContext
): Promise<MockData<typeof MOCK_HTTP_SERVER>> => {
  let requestData: HttpRequestData;
  let server: http.Server;
  return new Promise<MockData<typeof MOCK_HTTP_SERVER>>((resolve, reject) => {
    const app = express();
    app.all('*', (req, res, next) => {
      requestData = { method: req.method, path: req.path, body: req.body };
      const expectedResponse = getMatcher(responseMatcher, context);

      context.logger.debug(
        `Mock server at '${addressToString(server?.address())}' received`,
        requestData
      );

      res.status(
        context.descendAndStrip(
          expectedResponse.status,
          addLocation('response.status', context)
        ) as number
      );

      if (expectedResponse.body) {
        res.send(
          context.descendAndStrip(
            expectedResponse.body,
            addLocation('response.body', context)
          )
        );
      } else {
        res.send();
      }
      next();
    });

    server = app.listen();
    const address = server.address();

    context.logger.maintainerDebug(`Mock server setup on address`, address);
    context.logger.debug(
      `Mock server now listening on ${addressToString(address)}`
    );

    if (address == null) {
      context.logger.error(
        `Server address was null or undefined. This shouldn't happen, and is a bug`
      );
      reject(
        new CaseCoreError('Server address was null after startup', context)
      );
      return;
    }
    const mock = {
      'case:mock:type': MOCK_HTTP_SERVER,
      baseUrl: `http://${addressToString(address)}`,
      variables: { userId: '42' }, // TODO replace this with actual variables
    };
    context.logger.maintainerDebug(
      `Mock listening and ready to accept ${
        typeof address === 'object' ? address.family : 'no-family'
      } connections: `,
      mock
    );
    resolve({
      mock,
      assertableData: () =>
        new Promise<void>((startVerify, closeReject) => {
          server.close((err?: Error) => {
            context.logger.maintainerDebug(
              `Closing server from ${mock.baseUrl}`,
              mock
            );
            if (err) {
              context.logger.error(
                `There was an error shutting down the mock server. This shouldn't happen, and might be a bug`
              );
              closeReject(
                new CaseCoreError(
                  `The server at ${mock.baseUrl} was not running when it was asserted: ${err}`
                )
              );
            } else {
              startVerify();
            }
          });
        }).then(async () => {
          context.logger.maintainerDebug(
            `Asserting that the expected request for the mock at ${mock.baseUrl} happened correctly`
          );

          return {
            actual: requestData,
            context: addLocation('request', context),
            expected: expectedRequest,
          };
        }),
    });
  });
};
