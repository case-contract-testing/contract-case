import type { AnyMatcherType, MatcherFor } from 'dsl/Matchers/types';
import { CaseCoreError, MatcherExecutors } from 'core';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';

export const checkMatch = <T extends AnyMatcherType>(
  matcher: MatcherFor<T>,
  actual: unknown
): Array<MatchingError> => {
  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['case:matcher:type']}'`
    );
  }

  return executor(matcher, actual);
};
