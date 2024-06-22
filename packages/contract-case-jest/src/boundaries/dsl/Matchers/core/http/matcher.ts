import {
  CoreHttpStatusCodeMatcher,
  HTTP_STATUS_CODE_MATCHER_TYPE,
  CoreHttpRequestMatcher,
  HTTP_REQUEST_MATCHER_TYPE,
  CoreHttpResponseMatcher,
  HTTP_RESPONSE_MATCHER_TYPE,
  CoreUrlEncodedStringMatcher,
  URL_ENCODED_STRING_TYPE,
  CoreHttpBasicAuthValueMatcher,
  HTTP_BASIC_AUTH_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';
import { HttpMockRequest, HttpMockResponse } from './types.js';
import { validateCodes } from './validator.js';

export const httpStatusCodeMatcher = (
  codes: string | Array<string>,
  example?: number,
): CoreHttpStatusCodeMatcher => {
  const impliedExample = validateCodes(codes);
  return {
    '_case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
    '_case:matcher:example': example ?? impliedExample,
    '_case:matcher:rule': codes,
    '_case:matcher:resolvesTo': 'HttpStatusCode',
  };
};

export const httpRequestMatcher = (
  request: HttpMockRequest,
): CoreHttpRequestMatcher => ({
  ...request,
  '_case:matcher:type': HTTP_REQUEST_MATCHER_TYPE,
});

export const httpResponseMatcher = (
  response: HttpMockResponse,
): CoreHttpResponseMatcher => ({
  ...response,
  '_case:matcher:type': HTTP_RESPONSE_MATCHER_TYPE,
});

export const coreUrlEncodedString = (
  child: AnyCaseMatcherOrData,
): CoreUrlEncodedStringMatcher => ({
  '_case:matcher:type': URL_ENCODED_STRING_TYPE,
  '_case:matcher:child': child,
  '_case:matcher:accepts': 'string',
  '_case:matcher:resolvesTo': 'string',
});

export const coreBasicAuthValue = (
  username: AnyCaseMatcherOrData,
  password: AnyCaseMatcherOrData,
): CoreHttpBasicAuthValueMatcher => ({
  '_case:matcher:type': HTTP_BASIC_AUTH_TYPE,
  '_case:matcher:username': username,
  '_case:matcher:password': password,
  '_case:matcher:resolvesTo': 'string',
});
