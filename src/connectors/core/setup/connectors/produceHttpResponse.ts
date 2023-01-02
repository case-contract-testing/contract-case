import type * as http from 'http';
import express from 'express';

import { traversals } from 'diffmatch';
import type { HttpRequestData, Assertable } from 'entities/types';
import {
  CoreHttpRequestResponseMatcherPair,
  CONSUME_HTTP_RESPONSE,
} from 'entities/nodes/interactions/types';
import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';
import { CaseCoreError } from 'entities';

export const setupHttpResponseProducer = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: CoreHttpRequestResponseMatcherPair,
  context: MatchContext
): Promise<Assertable<typeof CONSUME_HTTP_RESPONSE>> => {
  let requestData: HttpRequestData;
  let server: http.Server;
  return new Promise<Assertable<typeof CONSUME_HTTP_RESPONSE>>(
    (resolve, reject) => {
      const app = express();
      app.all('*', (req, res, next) => {
        requestData = { method: req.method, path: req.path, body: req.body };
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

      server = app.listen(8080);
      const address = server.address();

      if (address == null) {
        reject(
          new CaseCoreError('Server address was null after startup', context)
        );
      } else {
        resolve({
          mock: {
            'case:interaction:type': CONSUME_HTTP_RESPONSE,
            baseUrl: `http://${
              typeof address === 'string' ? address : `:${address.port}`
            }`,
          },
          assert: () =>
            new Promise<void>((startVerify, closeReject) => {
              server.close((err?: Error) => {
                if (err) {
                  closeReject(
                    new CaseCoreError(
                      `The server waas not running when it was asserted: ${err}`
                    )
                  );
                } else {
                  startVerify();
                }
              });
            }).then(async () =>
              context.descendAndCheck(
                expectedRequest,
                addLocation('request', context),
                requestData
              )
            ),
        });
      }
    }
  );
};
