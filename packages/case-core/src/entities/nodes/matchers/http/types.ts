import type {
  AnyCaseNodeOrData,
  AnyData,
  AnyStringMatcher,
} from '../../../../entities/types';

export const HTTP_STATUS_CODE_MATCHER_TYPE = '_case:HttpStatusCode' as const;
export const HTTP_RESPONSE_MATCHER_TYPE = '_case:HttpResponseMatcher' as const;
export const HTTP_REQUEST_MATCHER_TYPE = '_case:HttpRequestMatcher' as const;
export const URL_ENCODED_STRING_TYPE = '_case:UrlEncodedString' as const;
export const HTTP_BASIC_AUTH_TYPE = '_case:HttpBasicAuth' as const;

export interface CoreUrlEncodedStringMatcher {
  '_case:matcher:type': typeof URL_ENCODED_STRING_TYPE;
  '_case:matcher:child': AnyCaseNodeOrData;
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
  '_case:matcher:username': AnyCaseNodeOrData;
  '_case:matcher:password': AnyCaseNodeOrData;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreHttpResponseMatcher {
  '_case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;
  '_case:matcher:uniqueName'?: string;
  uniqueName?: string;
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyCaseNodeOrData;
  headers?: AnyCaseNodeOrData | Record<string, AnyCaseNodeOrData>;
}

export interface CoreHttpRequestMatcher {
  '_case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;
  '_case:matcher:uniqueName'?: string;
  uniqueName?: string;
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  body?: AnyCaseNodeOrData;
  headers?: AnyCaseNodeOrData | Record<string, AnyCaseNodeOrData>;
  query?: AnyCaseNodeOrData;
}

interface QueryObject {
  [key: string]: undefined | string | string[] | QueryObject | QueryObject[];
}

export interface HttpRequestData {
  body: AnyData;
  method: string;
  path: string;
  query?: QueryObject;
  headers?: Record<string, string | string[] | undefined>;
}

export interface HttpResponseData {
  status: number;
  body: AnyData;
  headers?: Record<string, string>;
}

export interface HttpMockResponse {
  uniqueName?: string;
  status: number | CoreHttpStatusCodeMatcher;
  headers?: AnyCaseNodeOrData | Record<string, AnyCaseNodeOrData>;
  body?: AnyCaseNodeOrData;
}

export interface HttpMockRequest {
  query?: AnyCaseNodeOrData;
  uniqueName?: string;
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  headers?: AnyCaseNodeOrData | Record<string, AnyCaseNodeOrData>;
  body?: AnyCaseNodeOrData;
}
