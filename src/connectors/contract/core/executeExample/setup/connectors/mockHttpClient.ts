import axios from 'axios';
import * as http from 'node:http';

import {
  CoreHttpRequestResponseMatcherPair,
  MOCK_HTTP_CLIENT,
} from 'entities/nodes/mocks/types';
import { addLocation } from 'entities/context';
import { CaseConfigurationError, CaseCoreError } from 'entities';
import type { MockData } from 'entities/nodes/mocks/setup.types';
import type {
  MatchContextData,
  HasBaseUrlUnderTest,
  MatchContext,
  HttpRequestData,
} from 'entities/types';

const isHasBaseUrl = (
  context: Partial<MatchContextData>
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

const httpAgent = new http.Agent({
  keepAlive: false,
});

const validateHttpRequestData = (
  maybeHttpRequestData: unknown
): HttpRequestData => {
  const data = maybeHttpRequestData as HttpRequestData;
  if (data === null || typeof data !== 'object') {
    throw new CaseConfigurationError(
      "Expected request description didn't resolve to a object"
    );
  }
  if (!('method' in data)) {
    throw new CaseConfigurationError(
      "Expected request description didn't contain a 'method' key"
    );
  }

  if (typeof data.method !== 'string') {
    throw new CaseConfigurationError(
      "Expected request description's method must be a string"
    );
  }

  if (!('path' in data) || typeof data.path !== 'string') {
    throw new CaseConfigurationError(
      "Expected request description didn't contain a 'path' key"
    );
  }

  return data;
};

export const setupHttpResponseConsumer = (
  {
    request: requestMatcher,
    response: expectedResponse,
  }: CoreHttpRequestResponseMatcherPair,
  parentContext: MatchContext
): Promise<MockData<typeof MOCK_HTTP_CLIENT>> =>
  Promise.resolve().then(() => {
    const expectedRequest = validateHttpRequestData(
      parentContext.descendAndStrip(
        requestMatcher,
        addLocation('expectedRequest', parentContext)
      )
    );

    const { body, method, path } = expectedRequest;

    return validateConfig(parentContext).then(
      (run: MatchContextData & HasBaseUrlUnderTest) => ({
        config: {
          'case:mock:type': MOCK_HTTP_CLIENT,
          variables: { userId: '42' }, // TODO replace this with actual variables
        },
        assertableData: () =>
          axios
            .request({
              validateStatus: () => true, // This means that all status codes resolve the promise
              method,
              httpAgent,
              url: `${run['case:currentRun:context:baseUrlUnderTest']}${path}`,
              ...(body
                ? {
                    body,
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
            .then(async (result) => ({
              actual: result,
              context: addLocation('response', parentContext),
              expected: expectedResponse,
            })),
      })
    );
  });
