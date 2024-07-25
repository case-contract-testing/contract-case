import {
  MOCK_FUNCTION_CALLER,
  MOCK_FUNCTION_EXECUTION,
  MockFunctionCallerDescriptor,
  MockFunctionExecutionDescriptor,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  MOCK_HTTP_SERVER,
  MOCK_HTTP_CLIENT,
  ConsumeHttpResponse,
  ProduceHttpResponse,
  AllHttpMockSetupInfo,
} from '@contract-case/case-core-plugin-http-dsl';
import { HasTypeForMockDescriptor } from '@contract-case/case-plugin-base';

export type AnyMockDescriptorType =
  | typeof MOCK_HTTP_SERVER
  | typeof MOCK_HTTP_CLIENT
  | typeof MOCK_FUNCTION_CALLER
  | typeof MOCK_FUNCTION_EXECUTION;

export type AnyMockDescriptor =
  | ConsumeHttpResponse
  | ProduceHttpResponse
  | MockFunctionCallerDescriptor
  | MockFunctionExecutionDescriptor;

export type CaseMockDescriptorFor<T extends AnyMockDescriptorType> = Extract<
  AnyMockDescriptor,
  HasTypeForMockDescriptor<T>
>;

export type AllMockSetupInfos = AllHttpMockSetupInfo;
