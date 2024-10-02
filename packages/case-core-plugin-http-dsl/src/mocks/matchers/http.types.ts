import {
  AnyData,
  AnyCaseMatcherOrData,
  AnyCaseMatcher,
} from '@contract-case/case-plugin-dsl-types';
import { CoreHttpStatusCodeMatcher } from './matchers.types';

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
  path: AnyCaseMatcher | string;
  method: AnyCaseMatcher | string;
  headers?: AnyCaseMatcherOrData | Record<string, AnyCaseMatcherOrData>;
  body?: AnyCaseMatcherOrData;
}
