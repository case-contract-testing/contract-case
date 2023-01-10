import type * as http from 'http';
import express from 'express';
import type * as net from 'node:net';

import { traversals } from 'diffmatch';
import {
  HttpRequestData,
  CoreHttpRequestResponseMatcherPair,
  MatchContext,
  CONSUME_HTTP_RESPONSE,
} from 'entities/types';
import { addLocation } from 'entities/context';
import { CaseCoreError } from 'entities';
import type { InteractionData } from 'entities/nodes/interactions/setup.types';

const addressToString = (address: string | net.AddressInfo | null) => {
  if (typeof address === 'string') return address;
  if (address === null || address === undefined) return `${address}`;
  if (address.family === 'IPv6') {
    return `[${address.address === '::' ? '::1' : address.address}]:${
      address.port
    }`;
  }
  return `${address.address === '::' ? 'localhost' : address.address}:${
    address.port
  }`;
};

export const setupHttpResponseProducer = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: CoreHttpRequestResponseMatcherPair,
  context: MatchContext
): Promise<InteractionData<typeof CONSUME_HTTP_RESPONSE>> => {
  let requestData: HttpRequestData;
  let server: http.Server;
  return new Promise<InteractionData<typeof CONSUME_HTTP_RESPONSE>>(
    (resolve, reject) => {
      const app = express();
      app.all('*', (req, res, next) => {
        requestData = { method: req.method, path: req.path, body: req.body };

        context.logger.debug(
          `Mock server at '${addressToString(server?.address())}' received`,
          requestData
        );

        res.status(
          traversals.descendAndStrip(
            expectedResponse.status,
            addLocation('response.status', context)
          ) as number
        );

        if (expectedResponse.body) {
          res.send(
            traversals.descendAndStrip(
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
        'case:interaction:type': CONSUME_HTTP_RESPONSE,
        baseUrl: `http://${addressToString(address)}`,
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
    }
  );
};
