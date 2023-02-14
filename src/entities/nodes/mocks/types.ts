import type {
  CoreHttpRequestMatcher,
  CoreHttpResponseMatcher,
  LookupableMatcher,
} from 'entities/types';

export type AnyMockType = typeof MOCK_HTTP_SERVER | typeof MOCK_HTTP_CLIENT;

export const MOCK_HTTP_SERVER = 'MockHttpServer' as const;
export const MOCK_HTTP_CLIENT = 'MockHttpClient' as const;

export type HasTypeForMock<T extends AnyMockType> = {
  'case:interaction:type': T;
};

type BaseMock = {
  'case:interaction:uniqueName': string;
};

export const isCaseMock = (maybeMock: unknown): maybeMock is AnyMock =>
  typeof maybeMock === 'object' &&
  maybeMock != null &&
  'case:interaction:type' in (maybeMock as AnyMock);

export type AnyMock = ConsumeHttpResponse | ProduceHttpResponse;

export type CaseMockFor<T extends AnyMockType> = Extract<
  AnyMock,
  HasTypeForMock<T>
>;

export interface CoreHttpRequestResponseMatcherPair {
  request: CoreHttpRequestMatcher | LookupableMatcher;
  response: CoreHttpResponseMatcher | LookupableMatcher;
}

export type ConsumeHttpResponse = HasTypeForMock<typeof MOCK_HTTP_SERVER> & {
  'case:run:context:asWritten': 'consume' | 'produce';
} & CoreHttpRequestResponseMatcherPair &
  BaseMock & {
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

export type ProduceHttpResponse = HasTypeForMock<typeof MOCK_HTTP_CLIENT> & {
  'case:run:context:asWritten': 'consume' | 'produce';
} & CoreHttpRequestResponseMatcherPair &
  BaseMock & {
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
