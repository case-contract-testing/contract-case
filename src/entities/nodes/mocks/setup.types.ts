import type { MatchContext } from 'entities/context/types';
import type { AnyCaseNodeOrData, AnyData } from 'entities/nodes/matchers/types';
import type {
  AnyMockType,
  CaseMockFor,
  MOCK_HTTP_CLIENT,
  HasTypeForMock,
  MOCK_HTTP_SERVER,
} from './types';

type MockOutput = {
  actual: AnyData;
  expected: AnyCaseNodeOrData;
  context: MatchContext;
};

export type MockData<T extends AnyMockType> = {
  mock: SetupInfoFor<T>;
  assertableData: () => Promise<MockOutput>;
};

export type MockSetupFn<T extends AnyMockType> = (
  interaction: CaseMockFor<T>,
  context: MatchContext
) => Promise<MockData<T>>;

type BaseConfig = {
  variables: Record<string, unknown>;
};

export type HttpRequestConsumerSetup = HasTypeForMock<typeof MOCK_HTTP_SERVER> &
  BaseConfig & {
    baseUrl: string;
  };

export type HttpRequestProducerSetup = HasTypeForMock<typeof MOCK_HTTP_CLIENT> &
  BaseConfig;

type AnySetupInfo = HttpRequestConsumerSetup | HttpRequestProducerSetup;

export type SetupInfoFor<T extends AnyMockType> = Extract<
  AnySetupInfo,
  HasTypeForMock<T>
>;
