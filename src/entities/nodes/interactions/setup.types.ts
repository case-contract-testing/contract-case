import type { MatchContext } from 'entities/context/types';
import type { AnyCaseNodeOrData, AnyData } from 'entities/nodes/matchers/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  MOCK_HTTP_CLIENT,
  HasTypeForInteraction,
  MOCK_HTTP_SERVER,
} from './types';

type InteractionOutput = {
  actual: AnyData;
  expected: AnyCaseNodeOrData;
  context: MatchContext;
};

export type InteractionData<T extends AnyInteractionType> = {
  mock: SetupInfoFor<T>;
  assertableData: () => Promise<InteractionOutput>;
};

export type InteractionSetupFn<T extends AnyInteractionType> = (
  interaction: CaseInteractionFor<T>,
  context: MatchContext
) => Promise<InteractionData<T>>;

type BaseConfig = {
  variables: Record<string, unknown>;
};

export type HttpRequestConsumerSetup = HasTypeForInteraction<
  typeof MOCK_HTTP_SERVER
> &
  BaseConfig & {
    baseUrl: string;
  };

export type HttpRequestProducerSetup = HasTypeForInteraction<
  typeof MOCK_HTTP_CLIENT
> &
  BaseConfig;

type AnySetupInfo = HttpRequestConsumerSetup | HttpRequestProducerSetup;

export type SetupInfoFor<T extends AnyInteractionType> = Extract<
  AnySetupInfo,
  HasTypeForInteraction<T>
>;
