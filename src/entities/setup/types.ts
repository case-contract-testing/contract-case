import type { MatchContext } from 'entities/context/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  CONSUME_HTTP_REQUEST,
  HasTypeForInteraction,
  PRODUCE_HTTP_REQUEST,
} from 'entities/nodes/interactions/types';
import type { Verifiable } from 'entities/types';

export type InteractionSetupFn<T extends AnyInteractionType> = (
  interaction: CaseInteractionFor<T>,
  context: MatchContext
) => Promise<Verifiable<T>>;

export type HttpRequestConsumerSetup = HasTypeForInteraction<
  typeof PRODUCE_HTTP_REQUEST
> & {
  baseUrl: string;
};

export type HttpRequestProducerSetup = HasTypeForInteraction<
  typeof CONSUME_HTTP_REQUEST
>;

type AnySetupInfo = HttpRequestConsumerSetup | HttpRequestProducerSetup;

export type SetupInfoFor<T extends AnyInteractionType> = Extract<
  AnySetupInfo,
  HasTypeForInteraction<T>
>;
