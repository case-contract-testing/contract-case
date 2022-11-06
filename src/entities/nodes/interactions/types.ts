import type {
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
} from 'entities/types';

export type AnyInteractionType =
  | typeof CONSUME_HTTP_RESPONSE
  | typeof PRODUCE_HTTP_RESPONSE;

export const CONSUME_HTTP_RESPONSE = 'ConsumeHttpResponse' as const;
export const PRODUCE_HTTP_RESPONSE = 'ProduceHttpResponse' as const;

export type HasTypeForInteraction<T extends AnyInteractionType> = {
  'case:interaction:type': T;
};
type BaseInteraction = {
  'case:interaction:uniqueName': string;
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

export interface CoreHttpRequestResponseMatcherPair {
  request: CoreHttpRequestMatcher;
  response: CoreHttpResponseMatcher;
}

export type ConsumeHttpResponse = HasTypeForInteraction<
  typeof CONSUME_HTTP_RESPONSE
> & {
  'case:run:context:asWritten': 'consume';
} & CoreHttpRequestResponseMatcherPair &
  BaseInteraction;

export type ProduceHttpResponse = HasTypeForInteraction<
  typeof PRODUCE_HTTP_RESPONSE
> & {
  'case:run:context:asWritten': 'produce';
} & CoreHttpRequestResponseMatcherPair &
  BaseInteraction;
