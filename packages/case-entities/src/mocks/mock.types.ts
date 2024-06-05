import {
  MOCK_HTTP_SERVER,
  MOCK_HTTP_CLIENT,
  ConsumeHttpResponse,
  ProduceHttpResponse,
} from '@contract-case/case-core-plugin-http-dsl';
import { HasTypeForMockDescriptor } from '@contract-case/case-plugin-base';

export type AnyMockDescriptorType =
  | typeof MOCK_HTTP_SERVER
  | typeof MOCK_HTTP_CLIENT;

export type AnyMockDescriptor = ConsumeHttpResponse | ProduceHttpResponse;

export type CaseMockDescriptorFor<T extends AnyMockDescriptorType> = Extract<
  AnyMockDescriptor,
  HasTypeForMockDescriptor<T>
>;
