import { CaseCoreError, MatcherExecutors } from 'core';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import * as leafMatchers from 'core/matchers';
import type { MatchContext } from 'core/context/types';
import {
  type AnyCaseNodeType,
  type CaseNodeFor,
  type AnyJson,
  isCaseNode,
} from './matchers/types';
import type { MatchingError } from './types';
import { foldIntoContext } from './context';

const inferMatcher = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyJson
) => {
  if (matcherOrData == null) {
    return leafMatchers.coreNullMatcher();
  }
  if (typeof matcherOrData === 'string') {
    return leafMatchers.coreStringMatcher(matcherOrData);
  }
  if (typeof matcherOrData === 'number') {
    return leafMatchers.coreNumberMatcher(matcherOrData);
  }
  if (typeof matcherOrData === 'boolean') {
    return leafMatchers.coreBooleanMatcher(matcherOrData);
  }

  if (isCaseNode(matcherOrData)) {
    return matcherOrData;
  }
  // TODO Object or array
  throw new Error('Not implemented');
};

export const matchCore = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyJson,
  actual: unknown,
  parentMatchContext: MatchContext
): Array<MatchingError> => {
  const matcher = inferMatcher<T>(matcherOrData) as CaseNodeFor<T>;
  const matchContext = foldIntoContext(matcher, parentMatchContext);

  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['case:matcher:type']}'`
    );
  }

  return executor(matcher, actual, matchContext);
};
