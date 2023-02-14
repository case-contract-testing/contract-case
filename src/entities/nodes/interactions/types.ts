import type {
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  LookupableMatcher,
} from 'entities/types';

export type AnyInteractionType =
  | typeof MOCK_HTTP_SERVER
  | typeof MOCK_HTTP_CLIENT;

export const MOCK_HTTP_SERVER = 'MockHttpServer' as const;
export const MOCK_HTTP_CLIENT = 'MockHttpClient' as const;

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
  request: CoreHttpRequestMatcher | LookupableMatcher;
  response: CoreHttpResponseMatcher | LookupableMatcher;
}

export type ConsumeHttpResponse = HasTypeForInteraction<
  typeof MOCK_HTTP_SERVER
> & {
  'case:run:context:asWritten': 'consume' | 'produce';
} & CoreHttpRequestResponseMatcherPair &
  BaseInteraction & {
    'case:run:context:setup': {
      write: {
        type: typeof MOCK_HTTP_SERVER;
        stateVariables: 'default';
        triggers: 'provided';
      };
      read: {
        type: typeof MOCK_HTTP_CLIENT;
        stateVariables: 'state';
        triggers: 'generated';
      };
    };
  };

export type ProduceHttpResponse = HasTypeForInteraction<
  typeof MOCK_HTTP_CLIENT
> & {
  'case:run:context:asWritten': 'consume' | 'produce';
} & CoreHttpRequestResponseMatcherPair &
  BaseInteraction & {
    'case:run:context:setup': {
      write: {
        type: typeof MOCK_HTTP_CLIENT;
        stateVariables: 'state';
        triggers: 'generated';
      };
      read: {
        type: typeof MOCK_HTTP_SERVER;
        stateVariables: 'default';
        triggers: 'provided';
      };
    };
  };
