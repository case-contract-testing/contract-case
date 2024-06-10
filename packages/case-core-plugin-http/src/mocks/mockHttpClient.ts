import axios from 'axios';
import * as http from 'node:http';

import {
  CaseConfigurationError,
  CaseCoreError,
  DataContext,
  HasBaseUrlUnderTest,
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';
import {
  HttpRequestData,
  CoreHttpRequestResponseMatcherPair,
  MOCK_HTTP_CLIENT,
  AllHttpMockSetupInfo,
} from '@contract-case/case-core-plugin-http-dsl';

import { makeAssertionsOn } from './assert/assert';

const isHasBaseUrl = (
  context: Partial<DataContext>,
): context is HasBaseUrlUnderTest =>
  '_case:currentRun:context:baseUrlUnderTest' in context &&
  context['_case:currentRun:context:baseUrlUnderTest'] !== undefined &&
  typeof context['_case:currentRun:context:baseUrlUnderTest'] === 'string';

const validateConfig = (
  context: MatchContext,
): Promise<MatchContext & HasBaseUrlUnderTest> => {
  if (isHasBaseUrl(context)) {
    return Promise.resolve(context);
  }
  return Promise.reject(
    new CaseConfigurationError(
      `Must provide a URL Under Test in order to validate HTTP response providers`,
      context,
    ),
  );
};

const httpAgent = new http.Agent({
  keepAlive: false,
});

const validateHttpRequestData = (
  maybeHttpRequestData: unknown,
): HttpRequestData => {
  const data = maybeHttpRequestData as HttpRequestData;
  if (data === null || typeof data !== 'object') {
    throw new CaseConfigurationError(
      "Expected request description didn't resolve to a object",
    );
  }

  const { assertFieldPresent, assertIfFieldPresent } = makeAssertionsOn(
    data,
    'Expected request description',
  );
  assertFieldPresent({ field: 'method', type: 'string' });
  assertFieldPresent({ field: 'path', type: 'string' });
  assertIfFieldPresent({ field: 'query', type: 'object' });
  assertIfFieldPresent({ field: 'body', type: 'object' });
  assertIfFieldPresent({ field: 'headers', type: 'object', notNull: true });

  return data;
};

export const setupHttpResponseConsumer = (
  {
    request: requestMatcher,
    response: expectedResponse,
  }: CoreHttpRequestResponseMatcherPair,
  parentContext: MatchContext,
): Promise<MockData<AllHttpMockSetupInfo, typeof MOCK_HTTP_CLIENT>> =>
  Promise.resolve().then(() => {
    const expectedRequest = validateHttpRequestData(
      parentContext.descendAndStrip(
        requestMatcher,
        addLocation('expectedRequest', parentContext),
      ),
    );

    const { body, method, path, headers, query } = expectedRequest;

    return validateConfig(parentContext).then(
      (run: DataContext & HasBaseUrlUnderTest) => ({
        config: {
          '_case:mock:type': MOCK_HTTP_CLIENT,
          variables: parentContext['_case:currentRun:context:variables'],
        },
        assertableData: () =>
          axios
            .request({
              validateStatus: () => true, // This means that all status codes resolve the promise
              method,
              httpAgent,
              url: `${run['_case:currentRun:context:baseUrlUnderTest']}${path}`,
              ...(body
                ? {
                    body,
                  }
                : {}),
              ...(headers ? { headers } : {}),
              ...(query ? { params: query } : {}),
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
                          run['_case:currentRun:context:baseUrlUnderTest']
                        }', but no response. \n\nConfirm that you have:\n 1) Started the real server\n 2) Provided the correct URL to the running server\n\nUnderlying Error: ${
                          err.message
                        }`,
                        run,
                      ),
                    );
                  }
                  throw new CaseConfigurationError(
                    `Unable to send request to http server - did you start the server and provide the URL? (${err.message})`,
                    run,
                  );
                }
                throw new CaseCoreError(
                  `Something went wrong while creating the http request: ${err.message}`,
                  run,
                );
              },
            )
            .then(async (result) => ({
              actual: result,
              context: addLocation('response', parentContext),
              expected: expectedResponse,
            })),
      }),
    );
  });
