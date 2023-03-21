import type { MatchContext, AnyCaseNodeOrData } from '../../../entities/types';
import type {
  AnyMockDescriptorType,
  CaseMockDescriptorFor,
  MOCK_HTTP_CLIENT,
  HasTypeForMockDescriptor,
  MOCK_HTTP_SERVER,
} from './types';

type MockOutput = {
  actual: unknown;
  expected: AnyCaseNodeOrData;
  context: MatchContext;
};

export type MockData<T extends AnyMockDescriptorType> = {
  config: SetupInfoFor<T>;
  assertableData: () => Promise<MockOutput>;
};

export type MockSetupFn<T extends AnyMockDescriptorType> = (
  mock: CaseMockDescriptorFor<T>,
  context: MatchContext
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

type AnySetupInfo = HttpRequestConsumerSetup | HttpRequestProducerSetup;

export type SetupInfoFor<T extends AnyMockDescriptorType> = Extract<
  AnySetupInfo,
  HasTypeForMockDescriptor<T>
> &
  BaseConfig;
