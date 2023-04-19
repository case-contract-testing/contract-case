import {
  AnyCaseMatcherOrData,
  AnyCaseStringMatcher,
  AnyData,
  CoreHttpStatusCodeMatcher,
} from '@contract-case/case-entities-internal';

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
  headers?: AnyCaseMatcherOrData | Record<string, AnyCaseMatcherOrData>;
  body?: AnyCaseMatcherOrData;
}

export interface HttpMockRequest {
  query?: AnyCaseMatcherOrData;
  uniqueName?: string;
  path: AnyCaseStringMatcher | string;
  method: AnyCaseStringMatcher | string;
  headers?: AnyCaseMatcherOrData | Record<string, AnyCaseMatcherOrData>;
  body?: AnyCaseMatcherOrData;
}
