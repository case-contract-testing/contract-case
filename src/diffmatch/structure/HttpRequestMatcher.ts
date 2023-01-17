import { mustResolveToString } from 'entities/nodes/matchers/resolve';
import { CaseConfigurationError, CaseCoreError } from 'entities';
import { addLocation } from 'entities/context';
import type { MatchContext } from 'entities/context/types';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import type {
  MatcherExecutor,
  AnyData,
  CoreHttpRequestMatcher,
  HttpRequestData,
  HTTP_REQUEST_MATCHER_TYPE,
  MatchResult,
} from 'entities/types';

const isHttpRequestData = (data: unknown): data is HttpRequestData => {
  const maybeRequestData = data as HttpRequestData;
  return (
    typeof maybeRequestData.method === 'string' &&
    typeof maybeRequestData.path === 'string'
  );
};

const strip = (
  matcher: CoreHttpRequestMatcher,
  matchContext: MatchContext
): AnyData => ({
  ...(matcher.body
    ? {
        body: matchContext.descendAndStrip(
          matcher.body,
          addLocation('body', matchContext)
        ),
      }
    : {}),
  method: mustResolveToString(
    matcher.method,
    addLocation('method', matchContext)
  ),
  path: mustResolveToString(matcher.path, addLocation('path', matchContext)),
});

const check = async (
  matcher: CoreHttpRequestMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => {
  if (!actual) {
    throw new CaseConfigurationError(
      'The server was never called. Please confirm that you are calling the mock server, and not your real server',
      matchContext
    );
  }
  if (!isHttpRequestData(actual)) {
    throw new CaseCoreError(
      "The HttpRequestMatcher was invoked with something that isn't http request data.",
      matchContext
    );
  }
  return combineResults(
    await matchContext.descendAndCheck(
      matcher.method,
      addLocation('method', matchContext),
      actual.method
    ),
    await matchContext.descendAndCheck(
      matcher.path,
      addLocation('path', matchContext),
      actual.path
    ),
    matcher.body !== undefined
      ? await matchContext.descendAndCheck(
          matcher.body,
          addLocation('body', matchContext),
          actual.body
        )
      : makeResults()
  );
};

const name = (request: CoreHttpRequestMatcher, context: MatchContext): string =>
  request.uniqueName
    ? request.uniqueName
    : `a http ${context.descendAndDescribe(
        request.method,
        addLocation('method', context)
      )} request to ${context.descendAndDescribe(
        request.path,
        addLocation('path', context)
      )} ${request.body ? 'with a body' : 'without a body'}`;

export const HttpRequestMatcher: MatcherExecutor<
  typeof HTTP_REQUEST_MATCHER_TYPE
> = { describe: name, check, strip };
