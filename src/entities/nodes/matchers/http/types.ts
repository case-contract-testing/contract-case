import type {
  AnyCaseNodeOrData,
  AnyData,
  AnyStringMatcher,
} from '../../../../entities/types';

export const HTTP_STATUS_CODE_MATCHER_TYPE = 'HttpStatusCode' as const;
export const HTTP_RESPONSE_MATCHER_TYPE = 'HttpResponseMatcher' as const;
export const HTTP_REQUEST_MATCHER_TYPE = 'HttpRequestMatcher' as const;
export const URL_ENCODED_STRING_TYPE = 'UrlEncodedString' as const;
export const HTTP_BASIC_AUTH_TYPE = 'HttpBasicAuth' as const;

export interface CoreUrlEncodedStringMatcher {
  'case:matcher:type': typeof URL_ENCODED_STRING_TYPE;
  'case:matcher:child': AnyCaseNodeOrData;
  'case:matcher:accepts': 'string';
  'case:matcher:resolvesTo': 'string';
}

export interface CoreHttpStatusCodeMatcher {
  'case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;
  'case:matcher:rule': string | Array<string>;
  'case:matcher:example': number;
  'case:matcher:resolvesTo': 'HttpStatusCode';
}

export interface CoreHttpBasicAuthValue {
  'case:matcher:type': typeof HTTP_BASIC_AUTH_TYPE;
  'case:matcher:username': AnyCaseNodeOrData;
  'case:matcher:password': AnyCaseNodeOrData;
  'case:matcher:resolvesTo': 'string';
}

export type CoreHttpResponseMatcher = {
  'case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;
  'case:matcher:uniqueName'?: string;
  uniqueName?: string;
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyCaseNodeOrData;
  headers?: AnyCaseNodeOrData | Record<string, AnyCaseNodeOrData>;
};

export type CoreHttpRequestMatcher = {
  'case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;
  'case:matcher:uniqueName'?: string;
  uniqueName?: string;
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  body?: AnyCaseNodeOrData;
  headers?: AnyCaseNodeOrData | Record<string, AnyCaseNodeOrData>;
  query?: AnyCaseNodeOrData;
};

type QueryObject = {
  [key: string]: undefined | string | string[] | QueryObject | QueryObject[];
};

export type HttpRequestData = {
  body: AnyData;
  method: string;
  path: string;
  query?: QueryObject;
  headers?: Record<string, string | string[] | undefined>;
};

export type HttpResponseData = {
  status: number;
  body: AnyData;
  headers?: Record<string, string>;
};

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
