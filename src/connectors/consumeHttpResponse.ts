import axios from 'axios';

import { mustResolveToString, traversals } from 'diffmatch';
import type { Verifiable } from 'entities/types';
import {
  PRODUCE_HTTP_RESPONSE,
  HttpRequestResponseDescription,
} from 'entities/nodes/interactions/types';
import type {
  HasBaseUrl,
  LoggableContext,
  MatchContext,
} from 'entities/context/types';
import { addLocation } from 'entities/context';
import {
  combineResults,
  makeNoErrorResult,
} from 'entities/results/MatchResult';
import { CaseConfigurationError, CaseCoreError } from 'entities';

const isRunContext = (
  context: Partial<LoggableContext>
): context is LoggableContext & HasBaseUrl =>
  'case:currentRun:context:baseurl' in context &&
  context['case:currentRun:context:baseurl'] !== undefined &&
  typeof context['case:currentRun:context:baseurl'] === 'string';

const validateConfig = (
  context: MatchContext
): Promise<LoggableContext & HasBaseUrl> => {
  if (isRunContext(context)) {
    return Promise.resolve(context);
  }
  return Promise.reject(
    new CaseConfigurationError(
      `Must provide a URL in order to validate HTTP request consumers`,
      context
    )
  );
};

export const setupHttpResponseConsumer = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: HttpRequestResponseDescription,
  context: MatchContext
): Promise<Verifiable<typeof PRODUCE_HTTP_RESPONSE>> =>
  validateConfig(context).then((run: LoggableContext & HasBaseUrl) => ({
    mock: { 'case:interaction:type': PRODUCE_HTTP_RESPONSE },
    verify: () =>
      axios
        .request({
          validateStatus: () => true, // This means that all status codes resolve the promise
          method: mustResolveToString(
            expectedRequest.method,
            addLocation('method', context)
          ),
          url: `${run['case:currentRun:context:baseurl']}${mustResolveToString(
            expectedRequest.path,
            addLocation('path', context)
          )}`,
          ...(expectedRequest.body
            ? {
                body: traversals.descendAndStrip(
                  expectedRequest.body,
                  addLocation('body', context)
                ),
              }
            : {}),
        })
        .then(
          async (response) =>
            combineResults(
              ...(await Promise.all([
                traversals.descendAndCheck(
                  expectedResponse.status,
                  addLocation('response.status', context),
                  response.status
                ),
                expectedResponse.body !== undefined
                  ? traversals.descendAndCheck(
                      expectedResponse.body,
                      addLocation('response.body', context),
                      response.data
                    )
                  : makeNoErrorResult(),
              ]))
            ),
          (err) => {
            if (axios.isAxiosError(err)) {
              if (err.request) {
                return Promise.reject(
                  new CaseConfigurationError(
                    `[${
                      err.code ? err.code : 'HTTP_FAIL'
                    }]\n\nRequest was made to '${
                      run['case:currentRun:context:baseurl']
                    }', but no response. \n\nConfirm that you have:\n 1) Started the real server\n 2) Provided the correct URL to the running server\n\nUnderlying Error: ${
                      err.message
                    }`,
                    run
                  )
                );
              }
              throw new CaseConfigurationError(
                `Unable to send request to http server - did you start the server and provide the URL? (${err.message})`,
                run
              );
            }
            throw new CaseCoreError(
              `Something went wrong while creating the http request: ${err.message}`,
              run
            );
          }
        ),
  }));
