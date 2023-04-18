import type { AnyMatcherOrData, AnyStringMatcher } from '../matchers.types';

export const HTTP_RESPONSE_MATCHER_TYPE = 'case:HttpResponseMatcher' as const;
export const HTTP_REQUEST_MATCHER_TYPE = 'case:HttpRequestMatcher' as const;

export const HTTP_STATUS_CODE_MATCHER_TYPE = 'case:HttpStatusCode' as const;
export const URL_ENCODED_STRING_TYPE = 'case:UrlEncodedString' as const;
export const HTTP_BASIC_AUTH_TYPE = 'case:HttpBasicAuth' as const;

export interface CoreUrlEncodedStringMatcher {
  '_case:matcher:type': typeof URL_ENCODED_STRING_TYPE;
  '_case:matcher:child': AnyMatcherOrData;
  '_case:matcher:accepts': 'string';
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreHttpStatusCodeMatcher {
  '_case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;
  '_case:matcher:rule': string | Array<string>;
  '_case:matcher:example': number;
  '_case:matcher:resolvesTo': 'HttpStatusCode';
}

export interface CoreHttpBasicAuthValue {
  '_case:matcher:type': typeof HTTP_BASIC_AUTH_TYPE;
  '_case:matcher:username': AnyMatcherOrData;
  '_case:matcher:password': AnyMatcherOrData;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreHttpResponseMatcher {
  '_case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;
  '_case:matcher:uniqueName'?: string;
  uniqueName?: string;
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyMatcherOrData;
  headers?: AnyMatcherOrData | Record<string, AnyMatcherOrData>;
}

export interface CoreHttpRequestMatcher {
  '_case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;
  '_case:matcher:uniqueName'?: string;
  uniqueName?: string;
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  body?: AnyMatcherOrData;
  headers?: AnyMatcherOrData | Record<string, AnyMatcherOrData>;
  query?: AnyMatcherOrData;
}

export interface HttpMockResponse {
  uniqueName?: string;
  status: number | CoreHttpStatusCodeMatcher;
  headers?: AnyMatcherOrData | Record<string, AnyMatcherOrData>;
  body?: AnyMatcherOrData;
}

export interface HttpMockRequest {
  query?: AnyMatcherOrData;
  uniqueName?: string;
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  headers?: AnyMatcherOrData | Record<string, AnyMatcherOrData>;
  body?: AnyMatcherOrData;
}
