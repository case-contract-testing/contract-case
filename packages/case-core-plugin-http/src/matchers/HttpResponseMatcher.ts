import {
  CoreHttpResponseMatcher,
  HTTP_RESPONSE_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  MatchContext,
  addLocation,
  mustResolveToNumber,
  MatchResult,
  CaseCoreError,
  combineResults,
  makeNoErrorResult,
  MatcherExecutor,
  isCaseNode,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';
import { validateCodes } from './codeValidator';

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
  ...(matcher.headers
    ? {
        headers: matchContext.descendAndStrip(
          matcher.headers,
          addLocation('headers', matchContext),
        ),
      }
    : {}),
  status: mustResolveToNumber(
    matcher.status,
    addLocation('status', matchContext),
  ),
});

const check = async (
  matcher: CoreHttpResponseMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  if (!isHttpResponseData(actual)) {
    throw new CaseCoreError(
      "The HttpResponseMatcher was called with an actual that wasn't an http response",
    );
  }

  return combineResults(
    ...(await Promise.all([
      matchContext.descendAndCheck(
        matcher.status,
        addLocation('status', matchContext),
        actual.status,
      ),
      matcher.headers !== undefined
        ? await matchContext.descendAndCheck(
            matcher.headers,
            addLocation('headers', matchContext),
            actual.headers,
          )
        : makeNoErrorResult(),
      matcher.body !== undefined
        ? matchContext.descendAndCheck(
            matcher.body,
            addLocation('body', matchContext),
            actual.body,
          )
        : makeNoErrorResult(),
    ])),
  );
};

const name = (
  response: CoreHttpResponseMatcher,
  context: MatchContext,
): string =>
  response.uniqueName
    ? `returns ${response.uniqueName}`
    : `returns a (${context.descendAndDescribe(
        response.status,
        addLocation('status', context),
      )}) response ${
        response.body
          ? `with body ${context.descendAndDescribe(
              response.body,
              addLocation('body', context),
            )}`
          : 'without a body'
      }${
        response.headers
          ? ` with the following headers ${context.descendAndDescribe(
              response.headers,
              addLocation('headers', context),
            )}`
          : ''
      }`;

const validate = (
  matcher: CoreHttpResponseMatcher,
  matchContext: MatchContext,
): Promise<void> =>
  Promise.resolve()
    .then(() =>
      matcher.body != null
        ? matchContext.descendAndValidate(
            matcher.body,
            addLocation('body', matchContext),
          )
        : null,
    )
    .then(() =>
      matcher.headers != null
        ? matchContext.descendAndValidate(
            matcher.headers,
            addLocation('headers', matchContext),
          )
        : null,
    )
    .then(() => {
      if (!isCaseNode(matcher.status)) {
        validateCodes(matcher.status, addLocation('status', matchContext));
      }
      return matchContext.descendAndValidate(
        matcher.status,
        addLocation('status', matchContext),
      );
    });

export const HttpResponseMatcher: MatcherExecutor<
  typeof HTTP_RESPONSE_MATCHER_TYPE,
  CoreHttpResponseMatcher
> = { describe: name, check, strip, validate };
