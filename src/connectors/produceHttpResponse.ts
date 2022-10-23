import type * as http from 'http';
import express from 'express';

import { traversals } from 'diffmatch';
import type { MatchResult, Verifiable } from 'entities/types';
import {
  HttpRequestResponseDescription,
  CONSUME_HTTP_RESPONSE,
} from 'entities/nodes/interactions/types';
import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import { CaseCoreError } from 'entities';

export const setupHttpResponseProducer = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: HttpRequestResponseDescription,
  context: MatchContext
): Promise<Verifiable<typeof CONSUME_HTTP_RESPONSE>> => {
  let matchResults: MatchResult = [
    {
      message:
        'The server was never called. Please confirm that you are calling the mock server',
      expected: 'The server to be called',
      location: context['case:currentRun:context:location'],
      actual: 'The server never recieved any calls',
    },
  ];
  let server: http.Server;
  return new Promise<Verifiable<typeof CONSUME_HTTP_RESPONSE>>(
    (resolve, reject) => {
      const app = express();
      app.all('*', async (req, res) => {
        matchResults = combineResults(
          await traversals.descendAndCheck(
            expectedRequest.method,
            addLocation('method', context),
            req.method
          ),
          await traversals.descendAndCheck(
            expectedRequest.path,
            addLocation('path', context),
            req.path
          ),
          expectedRequest.body !== undefined
            ? await traversals.descendAndCheck(
                expectedRequest.body,
                addLocation('request.body', context),
                req.body
              )
            : makeResults()
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
          verify: async () =>
            new Promise<MatchResult>((resolveClose) => {
              server.close((err?: Error) => {
                resolveClose(
                  err
                    ? makeResults({
                        message:
                          'The server was not running when it was verified',
                        expected: 'The server to be running',
                        actual: err.message,
                        location: context['case:currentRun:context:location'],
                      })
                    : makeResults()
                );
              });
            }).then(async (closeResults) =>
              combineResults(closeResults, await matchResults)
            ),
        });
      }
    }
  );
};
