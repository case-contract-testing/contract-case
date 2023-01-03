import axios from 'axios';

import { traversals } from 'diffmatch';
import { PRODUCE_HTTP_RESPONSE } from 'entities/nodes/interactions/types';
import type {
  HasBaseUrlUnderTest,
  LoggableContext,
  MatchContext,
  Assertable,
  CoreHttpRequestResponseMatcherPair,
} from 'entities/types';
import { addLocation } from 'entities/context';
import { CaseConfigurationError, CaseCoreError } from 'entities';
import { mustResolveToString } from 'diffmatch/stripToType';

const isHasBaseUrl = (
  context: Partial<LoggableContext>
): context is HasBaseUrlUnderTest =>
  'case:currentRun:context:baseUrlUnderTest' in context &&
  context['case:currentRun:context:baseUrlUnderTest'] !== undefined &&
  typeof context['case:currentRun:context:baseUrlUnderTest'] === 'string';

const validateConfig = (
  context: MatchContext
): Promise<MatchContext & HasBaseUrlUnderTest> => {
  if (isHasBaseUrl(context)) {
    return Promise.resolve(context);
  }
  return Promise.reject(
    new CaseConfigurationError(
      `Must provide a URL Under Test in order to validate HTTP response providers`,
      context
    )
  );
};

export const setupHttpResponseConsumer = (
  {
    request: expectedRequest,
    response: expectedResponse,
  }: CoreHttpRequestResponseMatcherPair,
  context: MatchContext
): Promise<Assertable<typeof PRODUCE_HTTP_RESPONSE>> =>
  validateConfig(context).then(
    (run: LoggableContext & HasBaseUrlUnderTest) => ({
      mock: { 'case:interaction:type': PRODUCE_HTTP_RESPONSE },
      assert: () =>
        axios
          .request({
            validateStatus: () => true, // This means that all status codes resolve the promise
            method: mustResolveToString(
              expectedRequest.method,
              addLocation('method', context)
            ),
            url: `${
              run['case:currentRun:context:baseUrlUnderTest']
            }${mustResolveToString(
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
            (response) => ({ body: response.data, status: response.status }),
            (err) => {
              if (axios.isAxiosError(err)) {
                if (err.request) {
                  return Promise.reject(
                    new CaseConfigurationError(
                      `[${
                        err.code ? err.code : 'HTTP_FAIL'
                      }]\n\nRequest was made to '${
                        run['case:currentRun:context:baseUrlUnderTest']
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
          )
          .then(async (result) =>
            context.descendAndCheck(
              expectedResponse,
              addLocation('response', context),
              result
            )
          ),
    })
  );
