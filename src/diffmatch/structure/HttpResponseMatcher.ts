import { mustResolveToNumber } from 'entities/nodes/matchers/resolve';
import { CaseCoreError } from 'entities';
import { addLocation } from 'entities/context';
import type { MatchContext } from 'entities/context/types';
import {
  combineResults,
  makeNoErrorResult,
} from 'entities/results/MatchResult';
import type {
  MatcherExecutor,
  AnyData,
  CoreHttpResponseMatcher,
  HTTP_RESPONSE_MATCHER_TYPE,
  MatchResult,
} from 'entities/types';

type HttpResponseData = {
  body?: unknown;
  status: number;
};

const isHttpResponseData = (data: unknown): data is HttpResponseData => {
  const maybeResponseData = data as HttpResponseData;
  return typeof maybeResponseData.status === 'number';
};

const strip = (
  matcher: CoreHttpResponseMatcher,
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
  status: mustResolveToNumber(
    matcher.status,
    addLocation('status', matchContext)
  ),
});

const check = async (
  matcher: CoreHttpResponseMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => {
  if (!isHttpResponseData(actual)) {
    throw new CaseCoreError(
      "The HttpResponseMatcher was called with an actual that wasn't an http response"
    );
  }

  return combineResults(
    ...(await Promise.all([
      matchContext.descendAndCheck(
        matcher.status,
        addLocation('status', matchContext),
        actual.status
      ),
      matcher.body !== undefined
        ? matchContext.descendAndCheck(
            matcher.body,
            addLocation('body', matchContext),
            actual.body
          )
        : makeNoErrorResult(),
    ]))
  );
};

const name = (
  response: CoreHttpResponseMatcher,
  context: MatchContext
): string =>
  response.uniqueName
    ? response.uniqueName
    : `a (${context.descendAndDescribe(
        response.status,
        addLocation('status', context)
      )}) response ${
        response.body
          ? `with body ${context.descendAndDescribe(
              response.body,
              addLocation('body', context)
            )}`
          : 'without a body'
      }`;

export const HttpResponseMatcher: MatcherExecutor<
  typeof HTTP_RESPONSE_MATCHER_TYPE
> = { describe: name, check, strip };
