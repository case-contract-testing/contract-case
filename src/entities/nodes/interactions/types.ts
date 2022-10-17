import type {
  AnyCaseNodeOrData,
  AnyStringMatcher,
} from 'entities/nodes/matchers/types';
import type { CoreHttpStatusCodeMatcher } from 'entities/types';

export type AnyInteractionType =
  | typeof PRODUCE_HTTP_REQUEST
  | typeof CONSUME_HTTP_REQUEST;

export const PRODUCE_HTTP_REQUEST = 'ProduceHttpRequest' as const;
export const CONSUME_HTTP_REQUEST = 'ConsumeHttpRequest' as const;

export type HasTypeForInteraction<T extends AnyInteractionType> = {
  'case:interaction:type': T;
};

export const isCaseInteraction = (
  maybeInteraction: unknown
): maybeInteraction is AnyInteraction =>
  typeof maybeInteraction === 'object' &&
  maybeInteraction != null &&
  'case:interaction:type' in (maybeInteraction as AnyInteraction);

export type AnyInteraction = ProduceHttpRequest | ConsumeHttpRequest;

export type CaseInteractionFor<T extends AnyInteractionType> = Extract<
  AnyInteraction,
  HasTypeForInteraction<T>
>;

export interface HttpInteractionResponse {
  status: number | CoreHttpStatusCodeMatcher;
  body?: AnyCaseNodeOrData;
}

export interface HttpInteractionRequest {
  path: AnyStringMatcher | string;
  method: AnyStringMatcher | string;
  body?: AnyCaseNodeOrData;
}

export interface HttpRequestResponseDescription {
  request: HttpInteractionRequest;
  response: HttpInteractionResponse;
}

export type ProduceHttpRequest = HasTypeForInteraction<
  typeof PRODUCE_HTTP_REQUEST
> & {
  'case:run:context:expectation': 'produce';
} & HttpRequestResponseDescription;

export type ConsumeHttpRequest = HasTypeForInteraction<
  typeof CONSUME_HTTP_REQUEST
> & {
  'case:run:context:expectation': 'consume';
} & HttpRequestResponseDescription;
