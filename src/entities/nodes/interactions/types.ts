import type {
  AnyCaseNodeOrData,
  AnyStringMatcher,
} from 'entities/nodes/matchers/types';
import type { CoreHttpStatusCodeMatcher } from 'entities/types';

export type AnyInteractionType =
  | typeof CONSUME_HTTP_RESPONSE
  | typeof PRODUCE_HTTP_RESPONSE;

export const CONSUME_HTTP_RESPONSE = 'ConsumeHttpResponse' as const;
export const PRODUCE_HTTP_RESPONSE = 'ProduceHttpResponse' as const;

export type HasTypeForInteraction<T extends AnyInteractionType> = {
  'case:interaction:type': T;
};

export const isCaseInteraction = (
  maybeInteraction: unknown
): maybeInteraction is AnyInteraction =>
  typeof maybeInteraction === 'object' &&
  maybeInteraction != null &&
  'case:interaction:type' in (maybeInteraction as AnyInteraction);

export type AnyInteraction = ConsumeHttpResponse | ProduceHttpResponse;

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

export type ConsumeHttpResponse = HasTypeForInteraction<
  typeof CONSUME_HTTP_RESPONSE
> & {
  'case:run:context:asWritten': 'consume';
} & HttpRequestResponseDescription;

export type ProduceHttpResponse = HasTypeForInteraction<
  typeof PRODUCE_HTTP_RESPONSE
> & {
  'case:run:context:asWritten': 'produce';
} & HttpRequestResponseDescription;
