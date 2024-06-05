import {
  AnyCaseMatcherOrData,
  MatchContext,
  HasTypeForMockDescriptor,
  CaseMockDescriptorFor,
} from '@contract-case/case-plugin-base';
import {
  MOCK_HTTP_SERVER,
  MOCK_HTTP_CLIENT,
  HttpMockDescriptorTypes,
} from './constants.types';
import { ConsumeHttpResponse, ProduceHttpResponse } from './definitions.types';

type MockOutput = {
  actual: unknown;
  expected: AnyCaseMatcherOrData;
  context: MatchContext;
};

type AnySetupInfo = HttpRequestConsumerSetup | HttpRequestProducerSetup;

export type SetupInfoFor<T extends HttpMockDescriptorTypes> = Extract<
  AnySetupInfo,
  HasTypeForMockDescriptor<T>
> &
  BaseConfig;

export type MockData<T extends HttpMockDescriptorTypes> = {
  config: SetupInfoFor<T>;
  assertableData: () => Promise<MockOutput>;
};

export type MockSetupFn<T extends HttpMockDescriptorTypes> = (
  mock: CaseMockDescriptorFor<ConsumeHttpResponse | ProduceHttpResponse, T>,
  context: MatchContext,
) => Promise<MockData<T>>;

type BaseConfig = {
  // We allow Any here for now, because it makes defining tests very convenient
  // TODO: Don't use any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Record<string, any>;
};

export type HttpRequestConsumerSetup = HasTypeForMockDescriptor<
  typeof MOCK_HTTP_SERVER
> &
  BaseConfig & {
    baseUrl: string;
  };

export type HttpRequestProducerSetup = HasTypeForMockDescriptor<
  typeof MOCK_HTTP_CLIENT
> &
  BaseConfig;

export type ArbitraryConfig<T extends HttpMockDescriptorTypes> = BaseConfig & {
  '_case:mock:type': T;
  // TODO don't use any here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
};
