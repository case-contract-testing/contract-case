import type {
  AnyCaseNodeOrData,
  AnyStringMatcher,
} from 'entities/nodes/matchers/types';
import type { CoreHttpStatusCodeMatcher } from 'entities/types';

export type AnyInteractionType = typeof SEND_HTTP_REQUEST;

export const SEND_HTTP_REQUEST = 'SendHttpRequest' as const;

export type HasTypeForInteraction<T extends AnyInteractionType> = {
  'case:interaction:type': T;
};

export const isCaseInteraction = (
  maybeInteraction: unknown
): maybeInteraction is AnyInteraction =>
  typeof maybeInteraction === 'object' &&
  maybeInteraction != null &&
  'case:interaction:type' in (maybeInteraction as AnyInteraction);

export type AnyInteraction = DoesSendHttpRequest;

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

export type DoesSendHttpRequest = HasTypeForInteraction<
  typeof SEND_HTTP_REQUEST
> & {
  'case:context:expectation': 'does';
} & HttpRequestResponseDescription;
