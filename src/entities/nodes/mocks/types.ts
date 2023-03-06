import type { AnyCaseMatcher } from '../../../entities/types';

export type AnyMockDescriptorType =
  | typeof MOCK_HTTP_SERVER
  | typeof MOCK_HTTP_CLIENT;

export const MOCK_HTTP_SERVER = 'MockHttpServer' as const;
export const MOCK_HTTP_CLIENT = 'MockHttpClient' as const;

export type HasTypeForMockDescriptor<T extends AnyMockDescriptorType> = {
  'case:mock:type': T;
};

export const isCaseMock = (
  maybeMock: unknown
): maybeMock is AnyMockDescriptor =>
  typeof maybeMock === 'object' &&
  maybeMock != null &&
  'case:mock:type' in (maybeMock as AnyMockDescriptor);

export type AnyMockDescriptor = ConsumeHttpResponse | ProduceHttpResponse;

export type CaseMockDescriptorFor<T extends AnyMockDescriptorType> = Extract<
  AnyMockDescriptor,
  HasTypeForMockDescriptor<T>
>;

export interface CoreHttpRequestResponseMatcherPair {
  request: AnyCaseMatcher;
  response: AnyCaseMatcher;
}

export type ConsumeHttpResponse = HasTypeForMockDescriptor<
  typeof MOCK_HTTP_SERVER
> &
  CoreHttpRequestResponseMatcherPair & {
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

export type ProduceHttpResponse = HasTypeForMockDescriptor<
  typeof MOCK_HTTP_CLIENT
> &
  CoreHttpRequestResponseMatcherPair & {
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
