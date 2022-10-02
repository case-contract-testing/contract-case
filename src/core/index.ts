import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult, Verifiable } from 'entities/types';

import { matchCore } from './matching';
import { setupCore } from './setup';

export * from 'entities/CaseCoreError';

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
