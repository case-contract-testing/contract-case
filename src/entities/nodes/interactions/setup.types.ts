import type { MatchContext } from 'entities/context/types';
import type { AnyCaseNodeOrData, AnyData } from 'entities/nodes/matchers/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  PRODUCE_HTTP_RESPONSE,
  HasTypeForInteraction,
  CONSUME_HTTP_RESPONSE,
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

export type HttpRequestConsumerSetup = HasTypeForInteraction<
  typeof CONSUME_HTTP_RESPONSE
> & {
  baseUrl: string;
};

export type HttpRequestProducerSetup = HasTypeForInteraction<
  typeof PRODUCE_HTTP_RESPONSE
>;

type AnySetupInfo = HttpRequestConsumerSetup | HttpRequestProducerSetup;

export type SetupInfoFor<T extends AnyInteractionType> = Extract<
  AnySetupInfo,
  HasTypeForInteraction<T>
>;
