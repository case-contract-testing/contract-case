import {
  AnyCaseMatcherOrData,
  AnyCaseMatcher,
} from '@contract-case/case-plugin-dsl-types';
import {
  HTTP_BASIC_AUTH_TYPE,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
  URL_ENCODED_STRING_TYPE,
} from './constants.types';

export interface CoreUrlEncodedStringMatcher {
  '_case:matcher:type': typeof URL_ENCODED_STRING_TYPE;
  '_case:matcher:child': AnyCaseMatcherOrData;
  '_case:matcher:accepts': 'string';
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreHttpStatusCodeMatcher {
  '_case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;
  '_case:matcher:rule': string | Array<string>;
  '_case:matcher:example'?: number;
  '_case:matcher:resolvesTo': 'HttpStatusCode';
}

export interface CoreHttpBasicAuthValueMatcher {
  '_case:matcher:type': typeof HTTP_BASIC_AUTH_TYPE;
  '_case:matcher:username': AnyCaseMatcherOrData;
  '_case:matcher:password': AnyCaseMatcherOrData;
  '_case:matcher:resolvesTo': 'string';
}

export interface CoreHttpRequestMatcher {
  '_case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;
  '_case:matcher:uniqueName'?: string;
  uniqueName?: string;
  path: AnyCaseMatcher | string;
  method: AnyCaseMatcher | string;
  body?: AnyCaseMatcherOrData;
  headers?: AnyCaseMatcherOrData | Record<string, AnyCaseMatcherOrData>;
  query?: AnyCaseMatcherOrData;
}

export interface CoreHttpResponseMatcher {
  '_case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;
  '_case:matcher:uniqueName'?: string;
  uniqueName?: string;
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyCaseMatcherOrData;
  headers?: AnyCaseMatcherOrData | Record<string, AnyCaseMatcherOrData>;
}

export type AllHttpMatcherDescriptors =
  | CoreUrlEncodedStringMatcher
  | CoreHttpStatusCodeMatcher
  | CoreHttpBasicAuthValueMatcher
  | CoreHttpRequestMatcher
  | CoreHttpResponseMatcher;
