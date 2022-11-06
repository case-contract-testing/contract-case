import type * as http from 'http';
import express from 'express';

import { traversals } from 'diffmatch';
import type { AnyCaseNodeOrData, Verifiable } from 'entities/types';
import {
  HttpRequestResponseDescription,
  CONSUME_HTTP_RESPONSE,
} from 'entities/nodes/interactions/types';
import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import { CaseCoreError } from 'entities';

type RequestData = {
  body: AnyCaseNodeOrData;
  method: string;
  path: string;
};

export const setupHttpResponseProducer = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: HttpRequestResponseDescription,
  context: MatchContext
): Promise<Verifiable<typeof CONSUME_HTTP_RESPONSE>> => {
  let requestData: RequestData;
  let server: http.Server;
  return new Promise<Verifiable<typeof CONSUME_HTTP_RESPONSE>>(
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
          verify: () =>
            new Promise<void>((startVerify, closeReject) => {
              server.close((err?: Error) => {
                if (err) {
                  closeReject(
                    new CaseCoreError(
                      `The server waas not running when it was verified: ${err}`
                    )
                  );
                } else {
                  startVerify();
                }
              });
            }).then(async () => {
              if (!requestData)
                return [
                  {
                    message:
                      'The server was never called. Please confirm that you are calling the mock server, and not your real server',
                    expected: 'The server to be called',
                    location: context['case:currentRun:context:location'],
                    actual: 'The server never recieved any calls',
                  },
                ];
              return combineResults(
                await traversals.descendAndCheck(
                  expectedRequest.method,
                  addLocation('method', context),
                  requestData.method
                ),
                await traversals.descendAndCheck(
                  expectedRequest.path,
                  addLocation('path', context),
                  requestData.path
                ),
                expectedRequest.body !== undefined
                  ? await traversals.descendAndCheck(
                      expectedRequest.body,
                      addLocation('request.body', context),
                      requestData.body
                    )
                  : makeResults()
              );
            }),
        });
      }
    }
  );
};
