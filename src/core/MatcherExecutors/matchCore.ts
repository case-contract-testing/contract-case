import { MatcherExecutors } from 'core/MatcherExecutors';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { MatchContext } from 'core/context/types';
import { CaseCoreError } from 'core/CaseCoreError';
import { foldIntoContext } from 'core/context';
import { inferMatcher } from 'core/inferMatcher';
import type { MatchResult } from 'core/types';
import type {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyLeafOrStructure,
} from 'core/nodes/matchers/types';

export const matchCore = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  actual: unknown,
  parentMatchContext: MatchContext
): Promise<MatchResult> => {
  const matcher = inferMatcher<T>(matcherOrData) as CaseNodeFor<T>;
  const matchContext = foldIntoContext(matcher, parentMatchContext);

  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['case:matcher:type']}'`
    );
  }

  return Promise.resolve(executor(matcher, actual, matchContext));
};
