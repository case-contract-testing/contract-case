import type { MatchContext } from 'entities/context/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  HasTypeForInteraction,
  SEND_HTTP_REQUEST,
} from 'entities/nodes/interactions/types';
import type { Verifiable } from 'entities/types';

export type InteractionSetupFn<T extends AnyInteractionType> = (
  interaction: CaseInteractionFor<T>,
  context: MatchContext
) => Promise<Verifiable<T>>;

export type HttpSetup = HasTypeForInteraction<typeof SEND_HTTP_REQUEST> & {
  baseUrl: string;
};

type AnySetupInfo = HttpSetup;

export type SetupInfoFor<T extends AnyInteractionType> = Extract<
  AnySetupInfo,
  HasTypeForInteraction<T>
>;
