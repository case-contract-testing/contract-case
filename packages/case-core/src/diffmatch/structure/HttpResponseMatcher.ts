import {
  CoreHttpResponseMatcher,
  AnyData,
  HTTP_RESPONSE_MATCHER_TYPE,
} from '@contract-case/case-entities-internal';
import { CaseCoreError } from '../../entities';
import { addLocation } from '../../entities/context';
import { mustResolveToNumber } from '../../entities/nodes/matchers/resolve';
import { combineResults, makeNoErrorResult } from '../../entities/results';
import type {
  MatchContext,
  MatchResult,
  MatcherExecutor,
} from '../../entities/types';

type HttpResponseData = {
  body?: unknown;
  status: number;
  headers: Record<string, string>;
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
  ...(matcher.headers
    ? {
        headers: matchContext.descendAndStrip(
          matcher.headers,
          addLocation('headers', matchContext)
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
      matcher.headers !== undefined
        ? await matchContext.descendAndCheck(
            matcher.headers,
            addLocation('headers', matchContext),
            actual.headers
          )
        : makeNoErrorResult(),
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
      }${
        response.headers
          ? ` with the following headers ${context.descendAndDescribe(
              response.headers,
              addLocation('headers', context)
            )}`
          : ''
      }`;

export const HttpResponseMatcher: MatcherExecutor<
  typeof HTTP_RESPONSE_MATCHER_TYPE
> = { describe: name, check, strip };
