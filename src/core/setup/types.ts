import type {
  AnyInteractionType,
  CaseInteractionFor,
  HasTypeForInteraction,
  SEND_HTTP_REQUEST,
} from 'core/nodes/interactions/types';
import type { Verifiable } from 'core/types';

export type InteractionSetupFn<T extends AnyInteractionType> = (
  matcher: CaseInteractionFor<T>
) => Promise<Verifiable<T>>;

export type HttpSetup = HasTypeForInteraction<typeof SEND_HTTP_REQUEST> & {
  baseUrl: string;
};

type AnySetupInfo = HttpSetup;

export type SetupInfoFor<T extends AnyInteractionType> = Extract<
  AnySetupInfo,
  HasTypeForInteraction<T>
>;
