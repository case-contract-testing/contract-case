import type * as http from 'http';
import express from 'express';

import { checkMatch } from 'core';
import type { MatchResult, Verifiable } from 'core/types';
import {
  HttpRequestResponseDescription,
  SEND_HTTP_REQUEST,
} from 'core/nodes/interactions/types';

export const setupHttp = ({
  request: expectedRequest,
  response: expectedResponse,
}: HttpRequestResponseDescription): Promise<
  Verifiable<typeof SEND_HTTP_REQUEST>
> => {
  let matchResults: MatchResult = [
    {
      message:
        'The server was never called. Please confirm that you are calling the mock server',
      expected: 'The server to be called',
      actual: 'The server never recieved any calls',
    },
  ];
  let server: http.Server;
  return new Promise<Verifiable<typeof SEND_HTTP_REQUEST>>((resolve) => {
    const app = express();
    app.all('*', async (req, res) => {
      matchResults = [
        ...(await checkMatch(expectedRequest.method, req.method)),
        ...(await checkMatch(expectedRequest.path, req.path)),
        ...(expectedRequest.body !== undefined
          ? await checkMatch(expectedRequest.body, req.body)
          : []),
      ];
      res.status(expectedResponse.status).send(expectedResponse.body);
    });

    server = app.listen(8080);

    resolve({
      mock: {
        'case:interaction:type': SEND_HTTP_REQUEST,
        baseUrl: 'http://127.0.0.1:8080',
      },
      verify: async () =>
        new Promise<MatchResult>((resolveClose) => {
          server.close((err?: Error) => {
            resolveClose(
              err
                ? [
                    {
                      message:
                        'The server was not running when it was verified',
                      expected: 'The server to be running',
                      actual: err.message,
                    },
                  ]
                : []
            );
          });
        }).then(async (closeResults) => [
          ...closeResults,
          ...(await matchResults),
        ]),
    });
  });
};
