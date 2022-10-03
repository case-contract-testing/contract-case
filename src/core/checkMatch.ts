import { applyDefaultContext } from 'entities/context';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

import { traversals } from 'diffmatch';

export * from 'entities/CaseCoreError';

export const checkMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown
): Promise<MatchResult> =>
  Promise.resolve(
    traversals.descendAndCheck(
      matcherOrData,
      applyDefaultContext(matcherOrData, traversals),
      actual
    )
  );
