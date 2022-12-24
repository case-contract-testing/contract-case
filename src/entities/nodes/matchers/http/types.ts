import type { AnyCaseNodeOrData, AnyStringMatcher } from 'entities/types';

export const HTTP_STATUS_CODE_MATCHER_TYPE = 'HttpStatusCode' as const;
export const HTTP_RESPONSE_MATCHER_TYPE = 'HttpResponseMatcher' as const;
export const HTTP_REQUEST_MATCHER_TYPE = 'HttpRequestMatcher' as const;

export interface CoreHttpStatusCodeMatcher {
  'case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;
  'case:matcher:rule': number | string | Array<number | string>;
  'case:matcher:example': number;
  'case:matcher:resolvesTo': 'HttpStatusCode';
}

export interface CoreHttpResponseMatcher {
  'case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;
  'case:matcher:uniqueName'?: string;
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyCaseNodeOrData;
}

export interface CoreHttpRequestMatcher {
  'case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;
  'case:matcher:uniqueName'?: string;
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  body?: AnyCaseNodeOrData;
}

export type HttpRequestData = {
  body: AnyCaseNodeOrData;
  method: string;
  path: string;
};

export interface HttpInteractionResponse {
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyCaseNodeOrData;
}

export interface HttpInteractionRequest {
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  body?: AnyCaseNodeOrData;
}
