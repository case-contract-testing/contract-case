import type { MatchContext } from 'entities/context/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  PRODUCE_HTTP_RESPONSE,
  HasTypeForInteraction,
  CONSUME_HTTP_RESPONSE,
} from 'entities/nodes/interactions/types';
import type { Verifiable } from 'entities/types';

export type InteractionSetupFn<T extends AnyInteractionType> = (
  interaction: CaseInteractionFor<T>,
  context: MatchContext
) => Promise<Verifiable<T>>;

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
