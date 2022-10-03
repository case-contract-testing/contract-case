import { applyDefaultContext } from 'entities/context';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

import { matchCore } from 'diffmatch';

export * from 'entities/CaseCoreError';

export const checkMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown
): Promise<MatchResult> =>
  matchCore(
    matcherOrData,
    applyDefaultContext(matcherOrData, matchCore),
    actual
  );
