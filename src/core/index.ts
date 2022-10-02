import { applyDefaultContext } from './context';
import { matchCore } from './matching';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from './nodes/interactions/types';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from './nodes/matchers/types';
import { setupCore } from './setup';
import type { MatchResult, Verifiable } from './types';

export * from './CaseCoreError';

export const checkMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown
): Promise<MatchResult> =>
  matchCore(
    matcherOrData,
    actual,
    applyDefaultContext(matcherOrData, matchCore)
  );

export const setup = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>
): Promise<Verifiable<T>> =>
  setupCore(interaction, applyDefaultContext(interaction, matchCore));
