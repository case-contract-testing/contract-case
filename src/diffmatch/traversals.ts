import type { MatchContext } from 'entities/context/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import { foldIntoContext } from 'entities/context';
import { inferMatcher } from 'diffmatch/inferMatcher';
import {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyLeafOrStructure,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  NUMBER_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  HTTP_STATUS_CODE_MATCHER_TYPE,
  AnyCaseNodeOrData,
} from 'entities/types';
import type { MatcherExecutor } from 'entities/executors/types';
import { HttpStatusCodeMatcher } from './leaf/http/HttpStatusCodeMatcher';
import { CascadingContext } from './contextShift/CascadingContext';
import { BooleanMatcher } from './leaf/primitives/BooleanMatcher';
import { NullMatcher } from './leaf/primitives/NullMatcher';
import { NumberMatcher } from './leaf/primitives/NumberMatcher';
import { StringMatcher } from './leaf/primitives/StringMatcher';
import { ShapedArrayExecutor } from './structure/ShapedArrayExecutor';
import { ShapedObjectExecutor } from './structure/ShapedObjectExecutor';

const MatcherExecutors: { [T in AnyCaseNodeType]: MatcherExecutor<T> } = {
  [NUMBER_MATCHER_TYPE]: NumberMatcher,
  [STRING_MATCHER_TYPE]: StringMatcher,
  [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
  [CASCADING_CONTEXT_MATCHER_TYPE]: CascadingContext,
  [NULL_MATCHER_TYPE]: NullMatcher,
  [SHAPED_ARRAY_MATCHER_TYPE]: ShapedArrayExecutor,
  [SHAPED_OBJECT_MATCHER_TYPE]: ShapedObjectExecutor,
  [HTTP_STATUS_CODE_MATCHER_TYPE]: HttpStatusCodeMatcher,
};

const getExecutor = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext
) => {
  const matcher = inferMatcher<T>(matcherOrData) as CaseNodeFor<T>;
  const matchContext = foldIntoContext(matcher, parentMatchContext);

  const executor: MatcherExecutor<T> =
    MatcherExecutors[matcher['case:matcher:type'] as T];
  if (!executor) {
    throw new CaseCoreError(
      `Missing executor for matcher type '${matcher['case:matcher:type']}'`
    );
  }
  return {
    check: (actual: unknown) => executor.check(matcher, matchContext, actual),
    strip: () => executor.strip(matcher, matchContext),
  };
};

const descendAndCheck = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext,
  actual: unknown
): ReturnType<MatcherExecutor<AnyCaseNodeType>['check']> =>
  getExecutor(matcherOrData, parentMatchContext).check(actual);

const descendAndStrip = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  parentMatchContext: MatchContext
): ReturnType<MatcherExecutor<T>['strip']> =>
  getExecutor(matcherOrData, parentMatchContext).strip();

export const traversals = {
  descendAndCheck,
  descendAndStrip,
};

export const mustResolveToString = (
  matcher: AnyCaseNodeOrData,
  context: MatchContext
): string => {
  const stripped = descendAndStrip(matcher, context);
  if (typeof stripped !== 'string') {
    throw new CaseCoreError(
      'Provided matcher did not resolve to a string',
      context
    );
  }
  return stripped;
};
