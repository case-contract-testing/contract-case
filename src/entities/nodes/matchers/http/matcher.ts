import type { AnyCaseNodeOrData, AnyStringMatcher } from '../types';
import {
  CoreHttpBasicAuthValue,
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  CoreHttpStatusCodeMatcher,
  CoreUrlEncodedStringMatcher,
  HttpMockRequest,
  HttpMockResponse,
  HTTP_BASIC_AUTH_TYPE,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
  URL_ENCODED_STRING_TYPE,
} from './types';
import { validateCodes } from './validator';

export const httpStatusCodeMatcher = (
  codes: string | Array<string>,
  example?: number
): CoreHttpStatusCodeMatcher => {
  const impliedExample = validateCodes(codes);
  return {
    'case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
    'case:matcher:example': example ?? impliedExample,
    'case:matcher:rule': codes,
    'case:matcher:resolvesTo': 'HttpStatusCode',
  };
};

export const httpRequestMatcher = (
  request: HttpMockRequest
): CoreHttpRequestMatcher => ({
  ...request,
  'case:matcher:type': HTTP_REQUEST_MATCHER_TYPE,
});

export const httpResponseMatcher = (
  response: HttpMockResponse
): CoreHttpResponseMatcher => ({
  ...response,
  'case:matcher:type': HTTP_RESPONSE_MATCHER_TYPE,
});

export const coreUrlEncodedString = (
  child: AnyCaseNodeOrData
): CoreUrlEncodedStringMatcher => ({
  'case:matcher:type': URL_ENCODED_STRING_TYPE,
  'case:matcher:child': child,
  'case:matcher:accepts': 'string',
  'case:matcher:resolvesTo': 'string',
});

export const coreBasicAuthValue = (
  username: AnyStringMatcher,
  password: AnyStringMatcher
): CoreHttpBasicAuthValue => ({
  'case:matcher:type': HTTP_BASIC_AUTH_TYPE,
  'case:matcher:username': username,
  'case:matcher:password': password,
  'case:matcher:resolvesTo': 'string',
});
