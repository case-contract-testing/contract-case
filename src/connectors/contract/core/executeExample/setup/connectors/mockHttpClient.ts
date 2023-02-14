import axios from 'axios';
import * as http from 'node:http';

import { MOCK_HTTP_CLIENT } from 'entities/nodes/mocks/types';
import {
  HasBaseUrlUnderTest,
  MatchContextData,
  MatchContext,
  CoreHttpRequestResponseMatcherPair,
  CoreHttpRequestMatcher,
  LookupableMatcher,
  HTTP_REQUEST_MATCHER_TYPE,
} from 'entities/types';
import { addLocation } from 'entities/context';
import { CaseConfigurationError, CaseCoreError } from 'entities';
import { mustResolveToString } from 'entities/nodes/matchers/resolve';
import type { MockData } from 'entities/nodes/mocks/setup.types';

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

// TODO this really shouldn't be here
const getMatcher = (
  matcher: LookupableMatcher | CoreHttpRequestMatcher,
  matchContext: MatchContext
): CoreHttpRequestMatcher => {
  if (matcher['case:matcher:type'] === HTTP_REQUEST_MATCHER_TYPE) {
    return matcher;
  }
  if ('case:matcher:child' in matcher) {
    matchContext.saveLookupableMatcher(matcher);
  }
  const stored = matchContext.lookupMatcher(matcher['case:matcher:uniqueName']);
  if (
    typeof stored === 'object' &&
    stored != null &&
    'case:matcher:type' in stored &&
    stored['case:matcher:type'] === HTTP_REQUEST_MATCHER_TYPE
  ) {
    return stored;
  }
  throw new CaseConfigurationError(
    `The HTTP matcher didn't resolve to an ${HTTP_REQUEST_MATCHER_TYPE}`,
    matchContext
  );
};

const httpAgent = new http.Agent({
  keepAlive: false,
});

export const setupHttpResponseConsumer = (
  {
    request: requestMatcher,
    response: expectedResponse,
  }: CoreHttpRequestResponseMatcherPair,
  context: MatchContext
): Promise<MockData<typeof MOCK_HTTP_CLIENT>> =>
  Promise.resolve().then(() => {
    const expectedRequest = getMatcher(requestMatcher, context);

    return validateConfig(context).then(
      (run: MatchContextData & HasBaseUrlUnderTest) => ({
        config: {
          'case:mock:type': MOCK_HTTP_CLIENT,
          variables: { userId: '42' }, // TODO replace this with actual variables
        },
        assertableData: () =>
          axios
            .request({
              validateStatus: () => true, // This means that all status codes resolve the promise
              method: mustResolveToString(
                expectedRequest.method,
                addLocation('method', context)
              ),
              httpAgent,
              url: `${
                run['case:currentRun:context:baseUrlUnderTest']
              }${mustResolveToString(
                expectedRequest.path,
                addLocation('path', context)
              )}`,
              ...(expectedRequest.body
                ? {
                    body: context.descendAndStrip(
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
            .then(async (result) => ({
              actual: result,
              context: addLocation('response', context),
              expected: expectedResponse,
            })),
      })
    );
  });
