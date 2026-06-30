import { CoreHttpStatusCodeMatcher } from '@contract-case/case-core-plugin-http-dsl';
import {
  AnyCaseMatcher,
  AnyCaseMatcherOrData,
} from '@contract-case/case-entities-internal';

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
