import type * as http from 'http';
import express from 'express';

import { traversals } from 'diffmatch';
import type { MatchResult, Verifiable } from 'entities/types';
import {
  HttpRequestResponseDescription,
  SEND_HTTP_REQUEST,
} from 'entities/nodes/interactions/types';
import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import { CaseCoreError } from 'core';

export const setupHttp = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: HttpRequestResponseDescription,
  context: MatchContext
): Promise<Verifiable<typeof SEND_HTTP_REQUEST>> => {
  let matchResults: MatchResult = [
    {
      message:
        'The server was never called. Please confirm that you are calling the mock server',
      expected: 'The server to be called',
      location: context['case:context:location'],
      actual: 'The server never recieved any calls',
    },
  ];
  let server: http.Server;
  return new Promise<Verifiable<typeof SEND_HTTP_REQUEST>>(
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
        if (expectedResponse.body) {
          res
            .status(expectedResponse.status)
            .send(
              traversals.descendAndStrip(
                expectedResponse.body,
                addLocation('response.body', context)
              )
            );
        } else {
          res.status(expectedResponse.status).send();
        }
      });

      server = app.listen(8080);
      const address = server.address();

      if (address == null) {
        reject(new CaseCoreError('Server address was null after startup'));
      } else {
        resolve({
          mock: {
            'case:interaction:type': SEND_HTTP_REQUEST,
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
                        location: context['case:context:location'],
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
