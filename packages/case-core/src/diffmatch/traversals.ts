import {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyLeafOrStructure,
} from '@contract-case/case-entities-internal';
import type { MatchContext, MatcherExecutor } from '../entities/types';
import { CaseCoreError } from '../entities';
import { foldIntoContext } from '../entities/context';

import { inferMatcher } from '../diffmatch/inferMatcher';

import { MatcherExecutors } from './MatcherExecutors';

const getExecutor = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext
) => {
  const matcher = inferMatcher<T>(matcherOrData) as CaseNodeFor<T>;
  const matchContext = foldIntoContext(matcher, parentMatchContext);

  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['_case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['_case:matcher:type']}'`
    );
  }

  return {
    name: () => executor.describe(matcher, matchContext),
    check: async (actual: unknown) => {
      parentMatchContext.logger.deepMaintainerDebug(
        `Entering ${matcher['_case:matcher:type']}, actual is:`,
        actual
      );
      const result = await executor.check(matcher, matchContext, actual);
      parentMatchContext.logger.deepMaintainerDebug(
        `Exiting ${matcher['_case:matcher:type']}, with ${result.length} errors`
      );
      return result;
    },
    strip: () => executor.strip(matcher, matchContext),
  };
};

const descendAndCheck = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext,
  actual: unknown
): ReturnType<MatcherExecutor<AnyCaseNodeType>['check']> =>
  getExecutor(matcherOrData, parentMatchContext).check(actual);

const descendAndDescribe = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext
): string => getExecutor(matcherOrData, parentMatchContext).name();

const descendAndStrip = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext
): ReturnType<MatcherExecutor<T>['strip']> => {
  if (
    typeof matcherOrData === 'object' &&
    matcherOrData !== null &&
    '_case:matcher:example' in matcherOrData
  ) {
    parentMatchContext.logger.deepMaintainerDebug(
      `Executing strip with matcher type: ${matcherOrData['_case:matcher:type']} and specific example`
    );
    return getExecutor(
      matcherOrData['_case:matcher:example'],
      parentMatchContext
    ).strip();
  }
  parentMatchContext.logger.deepMaintainerDebug(
    `Executing strip with matcher ${
      typeof matcherOrData === 'object' &&
      matcherOrData !== null &&
      '_case:matcher:type' in matcherOrData
        ? `type: ${matcherOrData['_case:matcher:type']}`
        : `inferred from ${typeof matcherOrData}`
    }`
  );
  return getExecutor(matcherOrData, parentMatchContext).strip();
};

const selfVerify = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext
): ReturnType<MatcherExecutor<AnyCaseNodeType>['check']> =>
  getExecutor(matcherOrData, parentMatchContext).check(
    descendAndStrip(matcherOrData, parentMatchContext)
  );

export const traversals = {
  descendAndDescribe,
  descendAndCheck,
  descendAndStrip,
  selfVerify,
};
