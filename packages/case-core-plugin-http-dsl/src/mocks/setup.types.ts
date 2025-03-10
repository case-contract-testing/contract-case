import {
  BaseSetupInfo,
  HasTypeForMockDescriptor,
} from '@contract-case/case-plugin-dsl-types';
import {
  MOCK_HTTP_SERVER,
  MOCK_HTTP_CLIENT,
  HttpMockDescriptorTypes,
} from './constants.types';
import { ConsumeHttpResponse, ProduceHttpResponse } from './definitions.types';

export type AllHttpMockSetupInfo =
  | HttpRequestConsumerSetup
  | HttpRequestProducerSetup;

export type AllHttpMockDescriptors = ConsumeHttpResponse | ProduceHttpResponse;

export type HttpRequestConsumerSetup = HasTypeForMockDescriptor<
  typeof MOCK_HTTP_SERVER
> &
  BaseSetupInfo;

export type HttpRequestProducerSetup = HasTypeForMockDescriptor<
  typeof MOCK_HTTP_CLIENT
> &
  BaseSetupInfo;

export type ArbitraryConfig<T extends HttpMockDescriptorTypes> =
  BaseSetupInfo & {
    '_case:mock:type': T;
    // TODO don't use any here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
  };
