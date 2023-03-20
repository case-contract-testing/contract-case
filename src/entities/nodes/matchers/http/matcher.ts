import type { AnyCaseNodeOrData } from '../types';
import {
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  CoreHttpStatusCodeMatcher,
  CoreUrlEncodedStringMatcher,
  HttpMockRequest,
  HttpMockResponse,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
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

export const urlEncodedString = (
  child: AnyCaseNodeOrData
): CoreUrlEncodedStringMatcher => ({
  'case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
  'case:matcher:child': child,
  'case:matcher:accepts': 'string',
});
