import {
  HttpRequestData,
  CoreHttpRequestMatcher,
  HTTP_REQUEST_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  MatchContext,
  addLocation,
  mustResolveToString,
  MatchResult,
  CaseConfigurationError,
  CaseCoreError,
  makeResults,
  MatcherExecutor,
  combineResultPromises,
  DescribeSegment,
  describeConcat,
  describeMessage,
  renderToString,
} from '@contract-case/case-plugin-base';
import {
  AnyData,
  AnyCaseMatcherOrData,
} from '@contract-case/case-plugin-dsl-types';
import qs from 'qs';

const isHttpRequestData = (data: unknown): data is HttpRequestData => {
  const maybeRequestData = data as HttpRequestData;
  return (
    typeof maybeRequestData.method === 'string' &&
    typeof maybeRequestData.path === 'string'
  );
};

const strip = (
  matcher: CoreHttpRequestMatcher,
  matchContext: MatchContext,
): AnyData => ({
  ...(matcher.body
    ? {
        body: matchContext.descendAndStrip(
          matcher.body,
          addLocation('body', matchContext),
        ),
      }
    : {}),
  ...(matcher.query
    ? {
        query: matchContext.descendAndStrip(
          matcher.query,
          addLocation('query', matchContext),
        ),
      }
    : {}),
  ...(matcher.headers
    ? {
        headers: matchContext.descendAndStrip(
          matcher.headers,
          addLocation('headers', matchContext),
        ),
      }
    : {}),
  method: mustResolveToString(
    matcher.method,
    addLocation('method', matchContext),
  ),
  path: mustResolveToString(matcher.path, addLocation('path', matchContext)),
});

const check = async (
  matcher: CoreHttpRequestMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  if (!actual) {
    throw new CaseConfigurationError(
      'The server was never called. Please confirm that you are calling the mock server, and not your real server',
      matchContext,
    );
  }
  if (!isHttpRequestData(actual)) {
    throw new CaseCoreError(
      "The HttpRequestMatcher was invoked with something that isn't http request data.",
      matchContext,
    );
  }
  return combineResultPromises(
    ...[
      matchContext.descendAndCheck(
        matcher.method,
        addLocation('method', matchContext),
        actual.method,
      ),
      matchContext.descendAndCheck(
        matcher.path,
        addLocation('path', matchContext),
        actual.path,
      ),
      matcher.query !== undefined
        ? matchContext.descendAndCheck(
            matcher.query,
            addLocation('query', matchContext),
            actual.query,
          )
        : Promise.resolve(makeResults()),
      matcher.headers !== undefined
        ? matchContext.descendAndCheck(
            matcher.headers,
            addLocation('headers', matchContext),
            actual.headers,
          )
        : Promise.resolve(makeResults()),
      matcher.body !== undefined
        ? matchContext.descendAndCheck(
            matcher.body,
            addLocation('body', matchContext),
            actual.body,
          )
        : Promise.resolve(makeResults()),
    ],
  );
};

const name = (
  request: CoreHttpRequestMatcher,
  context: MatchContext,
): DescribeSegment => {
  if (request.uniqueName) {
    return describeMessage(request.uniqueName);
  }

  const segments: DescribeSegment[] = [
    describeMessage('an http '),
    context.descendAndDescribe(request.method, addLocation('method', context)),
    describeMessage(' request to '),
    context.descendAndDescribe(request.path, addLocation('path', context)),
  ];

  if (request.query !== undefined) {
    segments.push(
      describeMessage(
        `?${qs.stringify(
          Object.entries(
            request.query as Record<string, AnyCaseMatcherOrData>,
          ).reduce<Record<string, string>>(
            (acc, [key, value]) => ({
              ...acc,
              [key]: renderToString(
                context.descendAndDescribe(
                  value,
                  addLocation(`query[${key}]`, context),
                ),
              ),
            }),
            {} as Record<string, string>,
          ),
          { encode: false },
        )}`,
      ),
    );
  }

  if (request.headers) {
    segments.push(
      describeMessage(' with the following headers '),
      context.descendAndDescribe(
        request.headers,
        addLocation('headers', context),
      ),
    );
  }

  if (request.body) {
    segments.push(
      describeMessage(' and body '),
      context.descendAndDescribe(request.body, addLocation('body', context)),
    );
  } else {
    segments.push(describeMessage(' without a body'));
  }

  return describeConcat(...segments);
};

const validate = (
  matcher: CoreHttpRequestMatcher,
  matchContext: MatchContext,
): Promise<void> =>
  Promise.resolve()
    .then(() => {
      if (matcher.body != null) {
        return matchContext.descendAndValidate(
          matcher.body,
          addLocation('body', matchContext),
        );
      }
      return undefined;
    })
    .then(() => {
      if (matcher.query != null) {
        return matchContext.descendAndValidate(
          matcher.query,
          addLocation('query', matchContext),
        );
      }
      return undefined;
    })
    .then(() => {
      if (matcher.headers != null) {
        return matchContext.descendAndValidate(
          matcher.headers,
          addLocation('headers', matchContext),
        );
      }
      return undefined;
    })
    .then(() =>
      matchContext.descendAndValidate(
        matcher.method,
        addLocation('method', matchContext),
      ),
    );

export const HttpRequestMatcher: MatcherExecutor<
  typeof HTTP_REQUEST_MATCHER_TYPE,
  CoreHttpRequestMatcher
> = { describe: name, check, strip, validate };
