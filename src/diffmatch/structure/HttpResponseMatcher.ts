import { mustResolveToNumber } from 'diffmatch/stripToType';
import { CaseCoreError } from 'entities';
import { addLocation } from 'entities/context';
import type { MatchContext } from 'entities/context/types';
import type { MatcherExecutor } from 'entities/executors/types';
import {
  combineResults,
  makeNoErrorResult,
} from 'entities/results/MatchResult';
import type {
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
        addLocation('response.status', matchContext),
        actual.status
      ),
      matcher.body !== undefined
        ? matchContext.descendAndCheck(
            matcher.body,
            addLocation('response.body', matchContext),
            actual.body
          )
        : makeNoErrorResult(),
    ]))
  );
};

export const HttpResponseMatcher: MatcherExecutor<
  typeof HTTP_RESPONSE_MATCHER_TYPE
> = { check, strip };
