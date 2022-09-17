import type { AnyMatcherType, MatcherFor } from 'dsl/Matchers/types';
import { CaseCoreError, MatcherExecutors } from 'core';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { AnyJson } from 'dsl/types';
import * as MatcherDsl from 'dsl/Matchers';

const inferMatcher = <T extends AnyMatcherType>(
  matcherOrData: MatcherFor<T> | AnyJson
) => {
  if (matcherOrData == null) {
    return MatcherDsl.matchNull();
  }
  if (typeof matcherOrData === 'string') {
    return MatcherDsl.exactMatchPrimitive(matcherOrData);
  }
  if (typeof matcherOrData === 'number') {
    return MatcherDsl.exactMatchPrimitive(matcherOrData);
  }
  if (typeof matcherOrData === 'boolean') {
    // TODO implement this
    return MatcherDsl.matchNull();
  }

  if ('case:matcher:type' in matcherOrData) {
    return matcherOrData;
  }
  // TODO Object or array
  return MatcherDsl.matchNull();
};

export const checkMatch = <T extends AnyMatcherType>(
  matcherOrData: MatcherFor<T> | AnyJson,
  actual: unknown
): Array<MatchingError> => {
  const matcher = inferMatcher<T>(matcherOrData) as MatcherFor<T>;
  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['case:matcher:type']}'`
    );
  }

  return executor(matcher, actual);
};
